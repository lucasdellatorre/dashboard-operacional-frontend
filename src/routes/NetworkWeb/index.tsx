import { Box, MenuItem, TextField, Typography } from "@mui/material";
import React, { useState, useMemo, useEffect } from "react";
import WebChart from "../../components/dashboard/WebChart/WebChart";
import MultiSelect from "../../components/multiSelect";
import dayjs from "dayjs";
import { getIpMessageCounts } from "../../controllers/webIpsController";

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

const options = ["1", "2"]; // Substituindo mockData.nodes por opções fixas

const NetworkWebRoute: React.FC = () => {
  const [selectedType, setSelectedType] = useState("IP");
  const [selectedGroup, setSelectedGroup] = useState("Ambos");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [selectedSimmetry, setSelectedSimmetry] = useState("Ambos");
  const [dateInitial, setDateInitial] = useState("");
  const [dateFinal, setDateFinal] = useState("");
  const [graphData, setGraphData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedOptions.length > 0) {
      setLoading(true);
      setError(null);
      getIpMessageCounts(selectedOptions)
        .then((data) => {
          setGraphData(data);
        })
        .catch((err) => {
          setError("Erro ao buscar dados do gráfico");
          setGraphData(null);
        })
        .finally(() => setLoading(false));
    } else {
      setGraphData(null);
    }
  }, [selectedOptions]);

  // Filtragem dos nós e links
  const filteredData = useMemo(() => {
    let nodes: any[] = [];
    let links: any[] = [];

    // Filtro por datas
    if (dateInitial || dateFinal) {
      links = links.filter((link) => {
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
      // Só mantém nós conectados
      const nodeIds = new Set(links.flatMap((l) => [l.source, l.target]));
      nodes = nodes.filter((n) => nodeIds.has(n.id));
    }

    // Filtro por IPs selecionados
    if (selectedOptions.length > 0) {
      nodes = nodes.filter(
        (node) => selectedOptions.includes(node.id) || node.group === 4 // Sempre mostrar alvos
      );
      const nodeIds = nodes.map((n) => n.id);
      links = links.filter(
        (link) => nodeIds.includes(link.source) && nodeIds.includes(link.target)
      );
    }

    // Filtro por Grupo
    if (selectedGroup !== "Ambos") {
      if (selectedGroup === "IP") {
        nodes = nodes.filter((node) => node.group !== 4);
      } else if (selectedGroup === "Interlocutor") {
        nodes = nodes.filter((node) => node.group === 4);
      }
      const nodeIds = nodes.map((n) => n.id);
      links = links.filter(
        (link) => nodeIds.includes(link.source) && nodeIds.includes(link.target)
      );
    }

    // Filtro por Tipo (apenas exemplo, pois não há campo de tipo real)
    if (selectedType !== "Todos") {
      if (selectedType === "IP") {
        nodes = nodes.filter((node) => node.group !== 4);
      } else if (selectedType === "Interlocutor") {
        nodes = nodes.filter((node) => node.group === 4);
      }
      const nodeIds = nodes.map((n) => n.id);
      links = links.filter(
        (link) => nodeIds.includes(link.source) && nodeIds.includes(link.target)
      );
    }

    // Filtro de Simetria
    if (selectedSimmetry !== "Ambos") {
      links = links.filter((link) => {
        const sourceNode = nodes.find((n) => n.id === link.source);
        const targetNode = nodes.find((n) => n.id === link.target);
        if (!sourceNode || !targetNode) return false;
        if (selectedSimmetry === "Simétricos") {
          return sourceNode.group === targetNode.group;
        } else if (selectedSimmetry === "Assimétricos") {
          return sourceNode.group !== targetNode.group;
        }
        return true;
      });
      // Só mantém nós conectados
      const nodeIds = new Set(links.flatMap((l) => [l.source, l.target]));
      nodes = nodes.filter((n) => nodeIds.has(n.id));
    }

    return { nodes, links };
  }, [
    selectedOptions,
    selectedGroup,
    selectedType,
    selectedSimmetry,
    dateInitial,
    dateFinal,
  ]);

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
        gap="0.5rem"
        px="1.5rem"
        py="0.5rem"
        style={{ minHeight: 0 }}
      >
        <Box
          sx={{
            width: "100%",
            minWidth: "0",
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
          }}
        >
          <Typography
            fontFamily={"Inter, sans-serif"}
            fontWeight={600}
            fontSize={"1.1rem"}
            mb={0.5}
            mt={0.5}
          >
            Seleção de IPs
          </Typography>
          <MultiSelect
            style="gray"
            placeholder="Selecione os IPs"
            height="40px"
            options={options}
            selectedOptions={selectedOptions}
            onChange={setSelectedOptions}
          />
        </Box>

        <Box
          width="100%"
          display="flex"
          py="0.2rem"
          flexDirection="column"
          gap="0.25rem"
        >
          <Typography
            variant="caption"
            fontSize={"14px"}
            fontFamily="Inter, sans-serif"
            fontWeight={600}
            mb={0.5}
          >
            Filtrar por:
          </Typography>
          <Box
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            gap="1rem"
            alignItems="center"
          >
            <TextField
              select
              label="Grupo"
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              sx={{
                ...focusedTextFieldStyles,
                minWidth: "8rem",
                backgroundColor: "transparent",
              }}
              size="small"
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
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              sx={{ ...focusedTextFieldStyles, minWidth: "8rem" }}
              size="small"
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
              select
              label="Simetria"
              value={selectedSimmetry}
              onChange={(e) => setSelectedSimmetry(e.target.value)}
              sx={{ ...focusedTextFieldStyles, minWidth: "8rem" }}
              size="small"
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
              size="small"
            />

            <TextField
              id="date-final"
              InputLabelProps={{ shrink: true }}
              label="Data Final"
              type="date"
              value={dateFinal}
              onChange={(e) => setDateFinal(e.target.value)}
              sx={{ ...focusedTextFieldStyles, minWidth: "8rem" }}
              size="small"
            />
          </Box>
        </Box>

        {/* Legenda dos Turnos */}
        <Box
          display="flex"
          gap="1.5rem"
          alignItems="center"
          mt="0.2rem"
          mb="0.2rem"
        >
          <Typography
            variant="subtitle2"
            fontFamily="Inter, sans-serif"
            fontWeight={600}
            fontSize="0.95rem"
          >
            Legenda de Turnos:
          </Typography>
          <Box display="flex" gap="0.7rem">
            <Box display="flex" alignItems="center" gap="0.3rem">
              <Box
                width="14px"
                height="14px"
                bgcolor="#808CBF"
                borderRadius="50%"
              />
              <Typography variant="body2" fontSize="0.95rem">
                Manhã
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap="0.3rem">
              <Box
                width="14px"
                height="14px"
                bgcolor="#31438C"
                borderRadius="50%"
              />
              <Typography variant="body2" fontSize="0.95rem">
                Tarde
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap="0.3rem">
              <Box
                width="14px"
                height="14px"
                bgcolor="#08102F"
                borderRadius="50%"
              />
              <Typography variant="body2" fontSize="0.95rem">
                Noite
              </Typography>
            </Box>
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
          </Box>
        </Box>
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
          {loading ? (
            <Typography color="white">Carregando...</Typography>
          ) : error ? (
            <Typography color="red">{error}</Typography>
          ) : (
            <WebChart data={graphData || { nodes: [], links: [] }} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default NetworkWebRoute;
