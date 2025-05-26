import { Box, MenuItem, TextField, Typography } from "@mui/material";
import React, { useState, useMemo, useContext, useEffect } from "react";
import WebChart from "../../components/dashboard/WebChart/WebChart";
import MultiSelect from "../../components/multiSelect";
import { AppContext } from "../../context/AppContext";
import { createWeb } from "../../controllers/webController";
import { WebLink, WebNode } from "../../interface/web/webInterface";

const menuItemStyles = {
  padding: "4px 16px",
  "&:hover": { backgroundColor: "rgba(158, 131, 59, 0.08)" },
  "&.Mui-selected": { backgroundColor: "rgb(233, 233, 233)" },
  "&.Mui-selected:hover": { backgroundColor: "hsla(44, 45.60%, 42.50%, 0.08)" },
};

const focusedTextFieldStyles = {
  minWidth: "11rem",
  "& label.Mui-focused": { color: "customButton.gold" },
  "& .MuiFilledInput-underline:after": {
    borderBottomColor: "customButton.gold",
  },
  "& .MuiFilledInput-root:after": { borderBottomColor: "customButton.gold" },
  "& .MuiFilledInput-root.Mui-focused:after": {
    borderBottomColor: "customButton.gold",
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "customButton.gold" },
};

const WebRoute: React.FC = () => {
  const { webChartFilters, setWebChartFilters } = useContext(AppContext);
  const [dateInitial, setDateInitial] = useState("");
  const [dateFinal, setDateFinal] = useState("");

  const [nodes, setNodes] = useState<WebNode[]>([]);
  const [links, setLinks] = useState<WebLink[]>([]);

  async function handleWebChart() {
    await createWeb({
      operationId: [1],
      targetId: [1586],
      suspectId: [],
    }).then((response) => {
      const newNodes = [...response.nodes];

      // Map through links and create missing target nodes
      response.links.forEach((link) => {
        const targetExists = newNodes.some((node) => node.id === link.target);
        if (!targetExists) {
          newNodes.push({
            id: link.target,
            group: 7, // Using group 7 as it seems to be the group for interceptations based on mockData
          });
        }
      });

      setNodes(newNodes);
      setLinks(response.links);
    });
  }

  console.log("nodes");
  console.log(nodes);
  console.log("links");
  console.log(links);
  useEffect(() => {
    handleWebChart();
  }, []);

  // Filtragem dos nós e links
  // TODO: Remover mockData, usar nodes e links do handleWebChart, adicionar datas
  const mockData = {
    nodes: [{ id: "Alvo 1", group: 3 }],
    links: [
      { source: "Alvo 1", target: "Marinho", value: 342, date: "2024-06-01" },
    ],
  };
  const options = mockData.nodes
    .filter((x) => x.group === 3)
    .map((node) => node.id);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const filteredData = useMemo(() => {
    let filteredLinks = mockData.links;

    // Filtro por datas
    // if (dateInitial || dateFinal) {
    //   filteredLinks = filteredLinks.filter((link) => {
    //     const linkDate = dayjs(link.date);
    //     const afterInitial = dateInitial
    //       ? linkDate.isAfter(dayjs(dateInitial)) ||
    //         linkDate.isSame(dayjs(dateInitial))
    //       : true;
    //     const beforeFinal = dateFinal
    //       ? linkDate.isBefore(dayjs(dateFinal)) ||
    //         linkDate.isSame(dayjs(dateFinal))
    //       : true;
    //     return afterInitial && beforeFinal;
    //   });
    // }

    // Filtro por alvos selecionados
    if (webChartFilters.options.length > 0) {
      filteredLinks = filteredLinks.filter(
        (link) =>
          webChartFilters.options.includes(link.source) ||
          webChartFilters.options.includes(link.target)
      );
    }

    // Filtro por Grupo
    if (webChartFilters.group !== "Ambos") {
      if (webChartFilters.group === "Grupo") {
        filteredLinks = filteredLinks.filter((link) => {
          const sourceNode = mockData.nodes.find((n) => n.id === link.source);
          const targetNode = mockData.nodes.find((n) => n.id === link.target);
          return sourceNode?.group === 4 || targetNode?.group === 4;
        });
      } else if (webChartFilters.group === "Número") {
        filteredLinks = filteredLinks.filter((link) => {
          const sourceNode = mockData.nodes.find((n) => n.id === link.source);
          const targetNode = mockData.nodes.find((n) => n.id === link.target);
          return sourceNode?.group !== 4 && targetNode?.group !== 4;
        });
      }
    }

    // Filtro de Simetria
    if (webChartFilters.symmetry !== "Ambos") {
      filteredLinks = filteredLinks.filter((link) => {
        const sourceNode = mockData.nodes.find((n) => n.id === link.source);
        const targetNode = mockData.nodes.find((n) => n.id === link.target);
        if (!sourceNode || !targetNode) return false;
        if (webChartFilters.symmetry === "Simétricos") {
          return sourceNode.group === targetNode.group;
        } else if (webChartFilters.symmetry === "Assimétricos") {
          return sourceNode.group !== targetNode.group;
        }
        return true;
      });
    }

    // Filtro por Tipo (apenas exemplo, pois não há campo de tipo real)
    // Aqui não há campo real, então não filtra nada

    // Agora, só exibe nós que participam de algum link visível
    const nodeIds = new Set(filteredLinks.flatMap((l) => [l.source, l.target]));
    const filteredNodes = nodes.filter((n) => nodeIds.has(n.id));

    return { nodes: filteredNodes, links: filteredLinks };
  }, [webChartFilters, dateInitial, dateFinal]);

  return (
    <Box
      width="100%"
      bgcolor="#F8F8F8"
      height="100vh"
      display="flex"
      flexDirection="column"
      padding="1rem 0 0 0"
    >
      <Box display="flex" flexDirection="column" gap="1rem" px="1rem">
        <Box
          sx={{
            width: "fit-content",
            minWidth: "25rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <Typography
            fontFamily={"Inter, sans-serif"}
            fontWeight={600}
            fontSize={"1.25rem"}
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

        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          gap="0.5rem"
        >
          <Typography
            variant="caption"
            fontSize={"14px"}
            fontFamily="Inter, sans-serif"
            fontWeight={600}
          >
            Filtrar por:
          </Typography>

          <Box display="flex" flexDirection="row" flexWrap="wrap" gap="2rem">
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
              {["Grupo", "Número", "Ambos"].map((value) => (
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
              <MenuItem value="Texto" sx={menuItemStyles}>
                Texto
              </MenuItem>
              <MenuItem
                value="Vídeo"
                sx={{
                  ...menuItemStyles,
                  "&.Mui-selected": { backgroundColor: "transparent" },
                }}
              >
                Vídeo
              </MenuItem>
              <MenuItem value="Todos" sx={menuItemStyles}>
                Todos
              </MenuItem>
            </TextField>

            <TextField
              select
              label="Simetria"
              value={webChartFilters.symmetry}
              onChange={(e) =>
                setWebChartFilters({
                  ...webChartFilters,
                  symmetry: e.target.value,
                })
              }
              sx={{ ...focusedTextFieldStyles, minWidth: "8rem" }}
            >
              {["Simétricos", "Assimétricos", "Ambos"].map((value) => (
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
              sx={{ ...focusedTextFieldStyles, minWidth: "8rem" }}
            />

            <TextField
              id="date-final"
              InputLabelProps={{ shrink: true }}
              label="Data Final"
              type="date"
              value={dateFinal}
              onChange={(e) => setDateFinal(e.target.value)}
              sx={{ ...focusedTextFieldStyles, minWidth: "8rem" }}
            />
          </Box>
        </Box>

        {/* Legenda dos Turnos */}
        <Box
          display="flex"
          gap="1rem"
          alignItems="center"
          mt="0.2rem"
          mb="0.8rem"
        >
          <Typography
            variant="subtitle2"
            fontFamily="Inter, sans-serif"
            fontWeight={600}
            fontSize="0.95rem"
          >
            Legenda de Turnos:
          </Typography>
          <Box display="flex" alignItems="center" gap="0.3rem">
            <Box
              width="14px"
              height="14px"
              bgcolor="#D62727"
              borderRadius="50%"
            />
            <Typography variant="body2" fontSize="0.95rem">
              Alvos
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap="0.3rem">
            <Box
              width="14px"
              height="14px"
              bgcolor="#FFA000"
              borderRadius="50%"
            />
            <Typography variant="body2" fontSize="0.95rem">
              Suspeitos
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap="0.3rem">
            <Box
              width="14px"
              height="14px"
              bgcolor="#757575"
              borderRadius="50%"
            />
            <Typography variant="body2" fontSize="0.95rem">
              Interceptações
            </Typography>
          </Box>
        </Box>
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
          <WebChart data={{ nodes: nodes, links: links }} />
        </Box>
      </Box>
    </Box>
  );
};

export default WebRoute;
