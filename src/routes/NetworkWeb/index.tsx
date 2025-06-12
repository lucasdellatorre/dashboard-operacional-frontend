import { Box, MenuItem, TextField, Typography, Collapse, IconButton } from "@mui/material";
import React, { useState, useMemo, useContext, useEffect } from "react";
import WebChart from "../../components/dashboard/WebChart/WebChart";
import MultiSelect from "../../components/multiSelect";
import dayjs from "dayjs";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { AppContext } from "../../context/AppContext";
import { WebLink, WebNode } from "../../interface/web/webInterface";
import { useNavigate } from "react-router-dom";
import { useTeiaIp } from "../../hooks/useTeiaIp";
import { MessageFilterGroup, MessageFilterType } from "../../interface/dashboard/chartInterface";

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
  },
};


const options: typeof Option[] = [];
/*
ex:
{
      "id": 249793,
      "internalTicketNumber": "2817461",
      "ip": "2803:6084:18c4:5c38:900e:1f4a:300:0",
      "versao": "NA",
      "numeroId": 596
    },
*/
const NetworkWebRoute: React.FC = () => {
  const {
    webChartFilters: filters,
    setWebChartFilters: setFilters,
    operations,
    numbers,
    suspects,
  } = useContext(AppContext);

  const [expanded, setExpanded] = useState(true);

  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!operations[0] && !numbers[0] && !suspects[0]) {
  //     navigate("/operacoes");
  //   }
  // }, [operations, numbers, suspects, navigate]);

  const { teiaData } = useTeiaIp();
  const [nodes, setNodes] = useState<WebNode[]>([]);
  const [links, setLinks] = useState<WebLink[]>([]);
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  // Filtragem dos nós e links
  // const filteredData = useMemo(() => {
  //   let nodes = mockData.nodes;
  //   let links = mockData.links;

  //   // Filtro por datas
  //   if (dateInitial || dateFinal) {
  //     links = links.filter((link) => {
  //       const linkDate = dayjs(link.date);
  //       const afterInitial = dateInitial
  //         ? linkDate.isAfter(dayjs(dateInitial)) ||
  //           linkDate.isSame(dayjs(dateInitial))
  //         : true;
  //       const beforeFinal = dateFinal
  //         ? linkDate.isBefore(dayjs(dateFinal)) ||
  //           linkDate.isSame(dayjs(dateFinal))
  //         : true;
  //       return afterInitial && beforeFinal;
  //     });
  //     // Só mantém nós conectados
  //     const nodeIds = new Set(links.flatMap((l) => [l.source, l.target]));
  //     nodes = nodes.filter((n) => nodeIds.has(n.id));
  //   }

  //   // Filtro por IPs selecionados
  //   if (selectedOptions.length > 0) {
  //     nodes = nodes.filter(
  //       (node) => selectedOptions.includes(node.id) || node.group === 4 // Sempre mostrar alvos
  //     );
  //     const nodeIds = nodes.map((n) => n.id);
  //     links = links.filter(
  //       (link) => nodeIds.includes(link.source) && nodeIds.includes(link.target)
  //     );
  //   }

  //   // Filtro por Grupo
  //   if (selectedGroup !== "Ambos") {
  //     if (selectedGroup === "IP") {
  //       nodes = nodes.filter((node) => node.group !== 4);
  //     } else if (selectedGroup === "Interlocutor") {
  //       nodes = nodes.filter((node) => node.group === 4);
  //     }
  //     const nodeIds = nodes.map((n) => n.id);
  //     links = links.filter(
  //       (link) => nodeIds.includes(link.source) && nodeIds.includes(link.target)
  //     );
  //   }

  //   // Filtro por Tipo (apenas exemplo, pois não há campo de tipo real)
  //   if (selectedType !== "Todos") {
  //     if (selectedType === "IP") {
  //       nodes = nodes.filter((node) => node.group !== 4);
  //     } else if (selectedType === "Interlocutor") {
  //       nodes = nodes.filter((node) => node.group === 4);
  //     }
  //     const nodeIds = nodes.map((n) => n.id);
  //     links = links.filter(
  //       (link) => nodeIds.includes(link.source) && nodeIds.includes(link.target)
  //     );
  //   }

  //   return { nodes, links };
  // }, [
  //   selectedOptions,
  //   selectedGroup,
  //   selectedType,
  //   dateInitial,
  //   dateFinal,
  // ]);

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
            pt="1rem"
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
                Seleção de IPs
              </Typography>
              <MultiSelect
                style="gray"
                placeholder="Selecione os IPs"
                height="53px"
                options={options}
                selectedOptions={[]}
                onChange={() => {}}
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
                  value={filters.group}
                  onChange={(e) => setFilters({ ...filters, group: e.target.value as MessageFilterGroup })}
                  sx={{ ...focusedTextFieldStyles, backgroundColor: "transparent" }}
                >
                  {["IP", "Interlocutor", "Ambos"].map((value) => (
                    <MenuItem key={value} value={value} sx={menuItemStyles}>
                      {value}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  select
                  label="Tipo"
                  value={filters.type}
                  onChange={(e) => setFilters({ ...filters, type: e.target.value as MessageFilterType })}
                  sx={focusedTextFieldStyles}
                >
                  <MenuItem value="IP" sx={menuItemStyles}>
                    IP
                  </MenuItem>
                  <MenuItem value="Interlocutor" sx={menuItemStyles}>
                    Interlocutor
                  </MenuItem>
                  <MenuItem value="Todos" sx={menuItemStyles}>
                    Todos
                  </MenuItem>
                </TextField>

                <TextField
                  id="date-initial"
                  InputLabelProps={{ shrink: true }}
                  label="Data Inicial"
                  type="date"
                  value={filters.dateInitial}
                  onChange={(e) => setFilters({ ...filters, dateInitial: e.target.value })}
                  sx={focusedTextFieldStyles}
                />

                <TextField
                  id="date-final"
                  InputLabelProps={{ shrink: true }}
                  label="Data Final"
                  type="date"
                  value={filters.dateFinal}
                  onChange={(e) => setFilters({ ...filters, dateFinal: e.target.value })}
                  sx={focusedTextFieldStyles}
                />

                <TextField
                  id="time-initial"
                  InputLabelProps={{ shrink: true }}
                  label="Horário Inicial"
                  type="time"
                  value={filters.timeInitial}
                  onChange={(e) => setFilters({ ...filters, timeInitial: e.target.value })}
                  sx={focusedTextFieldStyles}
                />

                <TextField
                  id="time-final"
                  InputLabelProps={{ shrink: true }}
                  label="Horário Final"
                  type="time"
                  value={filters.timeFinal}
                  onChange={(e) => setFilters({ ...filters, timeFinal: e.target.value })}
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
        >
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      <Box
        flex={1}
        bgcolor="#181818"
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
          <WebChart data={teiaData} />
        </Box>
      </Box>
    </Box>
  );
};

export default NetworkWebRoute;
