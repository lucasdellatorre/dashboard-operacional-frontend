import { Box, MenuItem, TextField, Typography, Collapse, IconButton } from "@mui/material";
import React, { useState, useMemo, useContext, useEffect } from "react";
import WebChart from "../../components/dashboard/WebChart/WebChart";
import MultiSelect from "../../components/multiSelect";
import { AppContext } from "../../context/AppContext";
import { createWeb } from "../../controllers/webController";
import { WebLink, WebNode } from "../../interface/web/webInterface";
import dayjs from "dayjs";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const menuItemStyles = {
  padding: "4px 16px",
  "&:hover": {
    backgroundColor: "transparent !important",
    color: "inherit !important",
  },
  "&.Mui-selected": {
    backgroundColor: "hsla(44, 45.60%, 42.50%, 0.08) !important",
    color: "inherit !important",
  },
  "&.Mui-selected:hover": {
    backgroundColor: "hsla(44, 45.60%, 42.50%, 0.08) !important",
    color: "inherit !important",
  },
  "&.Mui-selected, &.Mui-selected:focus, &.Mui-selected:active": {
    backgroundColor: "hsla(44, 45.60%, 42.50%, 0.08) !important",
    color: "inherit !important",
  },
};

const focusedTextFieldStyles = {
  minWidth: "11rem",
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "customButton.lightGray",
  },
  "& label.Mui-focused": {
    color: "inherit",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "customButton.lightGray",
    borderWidth: "1px",
  },
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "customButton.lightGray",
    },
    "&.Mui-focused fieldset": {
      borderColor: "customButton.lightGray",
    },
    "& input": {
      outline: "none",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(0, 0, 0, 0.23)",
    },
  },
};

const WebRoute: React.FC = () => {
  const { operations, suspects, numbers, webChartFilters, setWebChartFilters } =
    useContext(AppContext);
  
  const [expanded, setExpanded] = useState(true);
  
  // Definir data inicial como 1 mês atrás
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  const [dateInitial, setDateInitial] = useState(oneMonthAgo.toISOString().split('T')[0]);
  const [dateFinal, setDateFinal] = useState("");
  const [timeInitial, setTimeInitial] = useState("00:00");
  const [timeFinal, setTimeFinal] = useState("23:59");
  const [selectedShift, setSelectedShift] = useState("Todos");

  const [nodes, setNodes] = useState<WebNode[]>([]);
  const [links, setLinks] = useState<WebLink[]>([]);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  async function handleWebChart() {
    await createWeb({
      operationId: operations.map((op) => op.id),
      targetId: numbers.map((num) => num.id),
      suspectId: suspects.map((suspect) => suspect.id),
    }).then((response) => {
      const newNodes = [...response.nodes];

      // Map through links and create missing target nodes
      response.links.forEach((link) => {
        const targetExists = newNodes.some((node) => node.id === link.target);
        if (!targetExists) {
          newNodes.push({
            id: link.target,
            group: 6, // Grupo para interceptações
          });
        }
      });

      // Padronizar grupos dos nós por turno
      newNodes.forEach((node) => {
        // Alvos
        if (node.id.toLowerCase().includes("alvo")) {
          node.group = 4;
        } else if (node.id.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/)) {
          // IPs: classificar pelo turno predominante dos links
          const relatedLinks = response.links.filter(l => l.source === node.id || l.target === node.id);
          const hourCounts = [0, 0, 0, 0, 0]; // [manhã, tarde, noite, alvo, madrugada]
          relatedLinks.forEach(link => {
            if (link.date) {
              const hour = new Date(link.date).getHours();
              if (hour >= 0 && hour < 6) hourCounts[4]++; // Madrugada
              else if (hour >= 6 && hour < 12) hourCounts[0]++; // Manhã
              else if (hour >= 12 && hour < 18) hourCounts[1]++; // Tarde
              else hourCounts[2]++; // Noite
            }
          });
          // Descobrir o turno predominante
          const maxIdx = hourCounts.indexOf(Math.max(...hourCounts));
          node.group = [1,2,3,4,5][maxIdx];
          // Se não houver links com data, default manhã
          if (hourCounts.every(c => c === 0)) node.group = 1;
        }
      });

      setNodes(newNodes);
      setLinks(response.links);
    });
  }

  useEffect(() => {
    handleWebChart();
  }, []);

  // Filtragem dos nós e links
  const filteredData = useMemo(() => {
    let filteredLinks = links;

    // Filtro por datas
    if (dateInitial || dateFinal) {
      filteredLinks = filteredLinks.filter((link) => {
        const linkDate = dayjs(link.date);
        const afterInitial = dateInitial
          ? linkDate.isAfter(dayjs(dateInitial)) ||
            linkDate.isSame(dayjs(dateInitial))
          : true;
        const beforeFinal = dateFinal
          ? linkDate.isBefore(dayjs(dateFinal)) ||
            linkDate.isSame(dayjs(dateFinal))
          : true;
        return afterInitial && beforeFinal;
      });
    }

    // Filtro por alvos selecionados
    if (webChartFilters.options.length > 0) {
      filteredLinks = filteredLinks.filter(
        (link) =>
          webChartFilters.options.includes(link.source) ||
          webChartFilters.options.includes(link.target)
      );
    }

    // Filtro por Grupo
    if (webChartFilters.group !== "Todos") {
      if (webChartFilters.group === "Grupo") {
        filteredLinks = filteredLinks.filter((link) => {
          const sourceNode = nodes.find((n) => n.id === link.source);
          const targetNode = nodes.find((n) => n.id === link.target);
          return sourceNode?.group === 4 || targetNode?.group === 4;
        });
      } else if (webChartFilters.group === "Número") {
        filteredLinks = filteredLinks.filter((link) => {
          const sourceNode = nodes.find((n) => n.id === link.source);
          const targetNode = nodes.find((n) => n.id === link.target);
          return sourceNode?.group !== 4 && targetNode?.group !== 4;
        });
      }
    }

    // Filtro por Tipo
    if (webChartFilters.type !== "Todos") {
      filteredLinks = filteredLinks.filter((link) => {
        // Aqui você deve implementar a lógica de filtro por tipo
        // baseado nos dados reais que você recebe da API
        return true; // Temporário até implementar a lógica real
      });
    }

    // Filtro de Simetria
    if (webChartFilters.symmetry !== "Todos") {
      filteredLinks = filteredLinks.filter((link) => {
        const sourceNode = nodes.find((n) => n.id === link.source);
        const targetNode = nodes.find((n) => n.id === link.target);
        if (!sourceNode || !targetNode) return false;
        if (webChartFilters.symmetry === "Simétricos") {
          return sourceNode.group === targetNode.group;
        } else if (webChartFilters.symmetry === "Assimétricos") {
          return sourceNode.group !== targetNode.group;
        }
        return true;
      });
    }

    // Agora, só exibe nós que participam de algum link visível
    const nodeIds = new Set(filteredLinks.flatMap((l) => [l.source, l.target]));
    const filteredNodes = nodes.filter((n) => nodeIds.has(n.id));

    return { nodes: filteredNodes, links: filteredLinks };
  }, [webChartFilters, dateInitial, dateFinal, nodes, links]);

  const options = nodes.map((node) => node.id);

  return (
    <Box
      width="100%"
      bgcolor="#F8F8F8"
      height="100vh"
      display="flex"
      flexDirection="column"
      padding="0"
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        borderBottom={expanded ? "1px solid #e0e0e0" : "none"}
        sx={{
          transition: "all 0.3s ease-in-out",
        }}
      >
        <Collapse in={expanded} timeout="auto">
          <Box 
            display="flex" 
            flexDirection="column" 
            gap="1.5rem" 
            px="1.5rem"
            py="1rem"
            sx={{
              transition: "all 0.3s ease-in-out",
            }}
          >
            <Box
              sx={{
                width: "fit-content",
                minWidth: "25rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <Typography
                fontFamily={"Inter, sans-serif"}
                fontWeight={600}
                fontSize={"1.25rem"}
                color="text.primary"
              >
                Seleção de Alvos
              </Typography>
              <MultiSelect
                style="gray"
                placeholder="Selecione os nomes"
                height="53px"
                options={options}
                selectedOptions={webChartFilters.options}
                onChange={(opts) =>
                  setWebChartFilters({ ...webChartFilters, options: opts })
                }
              />
            </Box>

            <Box width="100%" display="flex" flexDirection="column" gap="0.75rem">
              <Typography
                variant="caption"
                fontSize={"14px"}
                fontFamily="Inter, sans-serif"
                fontWeight={600}
                color="text.primary"
              >
                Filtrar por:
              </Typography>

              <Box 
                display="flex" 
                flexDirection="row" 
                flexWrap="wrap" 
                gap="2.5rem"
                sx={{
                  transition: "all 0.3s ease-in-out",
                }}
              >
                <TextField
                  select
                  label="Grupo"
                  value={webChartFilters.group}
                  onChange={(e) =>
                    setWebChartFilters({
                      ...webChartFilters,
                      group: e.target.value,
                    })
                  }
                  sx={{ ...focusedTextFieldStyles, backgroundColor: "transparent" }}
                >
                  {["Todos", "Grupo", "Número"].map((value) => (
                    <MenuItem key={value} value={value} sx={menuItemStyles}>
                      {value}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  select
                  label="Tipo"
                  value={webChartFilters.type}
                  onChange={(e) =>
                    setWebChartFilters({ ...webChartFilters, type: e.target.value })
                  }
                  sx={focusedTextFieldStyles}
                >
                  {["Todos", "Texto", "Vídeo", "Áudio"].map((value) => (
                    <MenuItem key={value} value={value} sx={menuItemStyles}>
                      {value}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  select
                  label="Turno"
                  value={selectedShift}
                  onChange={(e) => setSelectedShift(e.target.value)}
                  sx={focusedTextFieldStyles}
                >
                  {["Todos", "Manhã", "Tarde", "Noite"].map((value) => (
                    <MenuItem key={value} value={value} sx={menuItemStyles}>
                      {value}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  id="date-initial"
                  InputLabelProps={{ shrink: true }}
                  label="Data Inicial"
                  type="date"
                  value={dateInitial}
                  onChange={(e) => setDateInitial(e.target.value)}
                  sx={focusedTextFieldStyles}
                />

                <TextField
                  id="date-final"
                  InputLabelProps={{ shrink: true }}
                  label="Data Final"
                  type="date"
                  value={dateFinal}
                  onChange={(e) => setDateFinal(e.target.value)}
                  sx={focusedTextFieldStyles}
                />

                <TextField
                  id="time-initial"
                  InputLabelProps={{ shrink: true }}
                  label="Horário Inicial"
                  type="time"
                  value={timeInitial}
                  onChange={(e) => setTimeInitial(e.target.value)}
                  sx={focusedTextFieldStyles}
                />

                <TextField
                  id="time-final"
                  InputLabelProps={{ shrink: true }}
                  label="Horário Final"
                  type="time"
                  value={timeFinal}
                  onChange={(e) => setTimeFinal(e.target.value)}
                  sx={focusedTextFieldStyles}
                />
              </Box>
            </Box>

            {/* Legenda dos Turnos */}
            <Box
              display="flex"
              gap="1.5rem"
              alignItems="center"
              mt="0.5rem"
              mb="1rem"
              sx={{
                transition: "all 0.3s ease-in-out",
              }}
            >
              <Typography
                variant="subtitle2"
                fontFamily="Inter, sans-serif"
                fontWeight={600}
                fontSize="0.95rem"
                color="text.primary"
              >
                Legenda de Turnos:
              </Typography>
              <Box display="flex" gap="1rem" flexWrap="wrap">
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Box
                    width="14px"
                    height="14px"
                    bgcolor="#000A2F"
                    borderRadius="50%"
                    sx={{
                      transition: "all 0.3s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.1)",
                      },
                    }}
                  />
                  <Typography variant="body2" fontSize="0.95rem" color="text.primary">
                    Madrugada (00h-6h)
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Box
                    width="14px"
                    height="14px"
                    bgcolor="#808CBF"
                    borderRadius="50%"
                    sx={{
                      transition: "all 0.3s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.1)",
                      },
                    }}
                  />
                  <Typography variant="body2" fontSize="0.95rem" color="text.primary">
                    Manhã (6h-12h)
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Box
                    width="14px"
                    height="14px"
                    bgcolor="#31438C"
                    borderRadius="50%"
                    sx={{
                      transition: "all 0.3s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.1)",
                      },
                    }}
                  />
                  <Typography variant="body2" fontSize="0.95rem" color="text.primary">
                    Tarde (12h-18h)
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Box
                    width="14px"
                    height="14px"
                    bgcolor="#0F1E55"
                    borderRadius="50%"
                    sx={{
                      transition: "all 0.3s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.1)",
                      },
                    }}
                  />
                  <Typography variant="body2" fontSize="0.95rem" color="text.primary">
                    Noite (18h-00h)
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Box
                    width="14px"
                    height="14px"
                    bgcolor="#D62727"
                    borderRadius="50%"
                    sx={{
                      transition: "all 0.3s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.1)",
                      },
                    }}
                  />
                  <Typography variant="body2" fontSize="0.95rem" color="text.primary">
                    Alvos
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Collapse>
        <IconButton 
          onClick={toggleExpanded} 
          size="small" 
          disableRipple
          sx={{
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
        >
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      <Box
        flex={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
        overflow="hidden"
      >
        <Box
          width="100%"
          height="100%"
          borderRadius="0"
          boxShadow="0px 0px 20px rgba(0,0,0,0.6)"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <WebChart data={filteredData} />
        </Box>
      </Box>
    </Box>
  );
};

export default WebRoute;
