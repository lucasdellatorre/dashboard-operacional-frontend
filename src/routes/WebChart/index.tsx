import { Box, MenuItem, TextField, Typography } from "@mui/material";
import React, { useState, useMemo } from "react";
import WebChart from "../../components/dashboard/WebChart/WebChart";
import MultiSelect from "../../components/multiSelect";
import dayjs from "dayjs";

const menuItemStyles = {
  padding: "4px 16px",
  "&:hover": { backgroundColor: "rgba(158, 131, 59, 0.08)" },
  "&.Mui-selected": { backgroundColor: "rgb(233, 233, 233)" },
  "&.Mui-selected:hover": { backgroundColor: "hsla(44, 45.60%, 42.50%, 0.08)" },
};

const focusedTextFieldStyles = {
  minWidth: "11rem",
  "& label.Mui-focused": { color: "customButton.gold" },
  "& .MuiFilledInput-underline:after": { borderBottomColor: "customButton.gold" },
  "& .MuiFilledInput-root:after": { borderBottomColor: "customButton.gold" },
  "& .MuiFilledInput-root.Mui-focused:after": { borderBottomColor: "customButton.gold" },
  "& .MuiInputLabel-root.Mui-focused": { color: "customButton.gold" },
};

const mockData = {
  nodes: [
    { id: "Alvo 1", group: 3 },
    { id: "Alvo 2", group: 3 },
    { id: "Alvo 3", group: 3 },
    { id: "Alvo 4", group: 3 },

    { id: "Marinho", group: 7 },
    { id: "(11) 91234-5678", group: 7 },
    { id: "(21) 99876-5432", group: 7 },
    { id: "(21) 98765-1234", group: 7 },
    { id: "(31) 97654-3210", group: 7 },
    { id: "(31) 96543-2109", group: 7 },
    { id: "Fernandinho", group: 7 },
    { id: "(41) 94321-0987", group: 7 },
    { id: "(51) 93210-9876", group: 7 },
    { id: "(51) 92109-8765", group: 7 },
    { id: "(61) 91098-7654", group: 7 },
    { id: "(61) 90987-6543", group: 7 },
    { id: "Pablo", group: 7 },
    { id: "(71) 98765-4321", group: 7 },
    { id: "(81) 97654-3210", group: 7 },
    { id: "(81) 96543-2109", group: 7 },
    { id: "(85) 95432-1098", group: 7 },
    { id: "(85) 94321-0987", group: 7 },
    { id: "(91) 93210-9876", group: 7 },
    { id: "(91) 92109-8765", group: 7 },
    { id: "(47) 91098-7654", group: 7 },
    { id: "(47) 90987-6543", group: 7 },
    { id: "(27) 99876-5432", group: 7 },
    { id: "(27) 98765-4321", group: 7 },
    { id: "(19) 97654-3210", group: 7 },
    { id: "(19) 96543-2109", group: 7 },
    { id: "(67) 95432-1098", group: 7 },
    { id: "(67) 94321-0987", group: 7 },
    { id: "(83) 93210-9876", group: 7 },
    { id: "(83) 92109-8765", group: 7 },
  ],
  links: [
    // Adicionando datas fictícias para cada link
    { source: "Alvo 1", target: "Marinho", value: 342, date: "2024-06-01" },
    { source: "Alvo 1", target: "(11) 91234-5678", value: 128, date: "2024-06-02" },
    { source: "Alvo 1", target: "(21) 99876-5432", value: 64, date: "2024-06-03" },
    { source: "Alvo 1", target: "(21) 98765-1234", value: 237, date: "2024-06-04" },
    { source: "Alvo 1", target: "(31) 97654-3210", value: 70, date: "2024-06-05" },
    { source: "Alvo 1", target: "(31) 96543-2109", value: 156, date: "2024-06-06" },
    { source: "Alvo 1", target: "Fernandinho", value: 572, date: "2024-06-01" },
    { source: "Alvo 1", target: "(41) 94321-0987", value: 321, date: "2024-06-02" },
    { source: "Alvo 2", target: "(51) 93210-9876", value: 454, date: "2024-06-03" },
    { source: "Alvo 2", target: "(51) 92109-8765", value: 189, date: "2024-06-04" },
    { source: "Alvo 2", target: "(61) 91098-7654", value: 18, date: "2024-06-05" },
    { source: "Alvo 2", target: "(61) 90987-6543", value: 567, date: "2024-06-06" },
    { source: "Alvo 2", target: "Pablo", value: 278, date: "2024-06-01" },
    { source: "Alvo 2", target: "(71) 98765-4321", value: 543, date: "2024-06-02" },
    { source: "Alvo 2", target: "(81) 97654-3210", value: 109, date: "2024-06-03" },
    { source: "Alvo 2", target: "(81) 96543-2109", value: 12, date: "2024-06-04" },
    { source: "Alvo 3", target: "(85) 95432-1098", value: 398, date: "2024-06-05" },
    { source: "Alvo 3", target: "(85) 94321-0987", value: 521, date: "2024-06-06" },
    { source: "Alvo 3", target: "(91) 93210-9876", value: 145, date: "2024-06-01" },
    { source: "Alvo 3", target: "(91) 92109-8765", value: 50, date: "2024-06-02" },
    { source: "Alvo 3", target: "(47) 91098-7654", value: 234, date: "2024-06-03" },
    { source: "Alvo 3", target: "(47) 90987-6543", value: 56, date: "2024-06-04" },
    { source: "Alvo 3", target: "(27) 99876-5432", value: 312, date: "2024-06-05" },
    { source: "Alvo 3", target: "(27) 98765-4321", value: 589, date: "2024-06-06" },
    { source: "Alvo 1", target: "(61) 90987-6543", value: 523, date: "2024-06-01" },
    { source: "Alvo 2", target: "(21) 98765-1234", value: 554, date: "2024-06-02" },
    { source: "Alvo 3", target: "(41) 94321-0987", value: 512, date: "2024-06-03" },
    { source: "Alvo 4", target: "(81) 96543-2109", value: 535, date: "2024-06-04" },
    { source: "Alvo 1", target: "(91) 92109-8765", value: 478, date: "2024-06-05" },
    { source: "Alvo 2", target: "(27) 98765-4321", value: 589, date: "2024-06-06" },
    { source: "Alvo 3", target: "(47) 90987-6543", value: 543, date: "2024-06-01" },
    { source: "Alvo 4", target: "Marinho", value: 576, date: "2024-06-02" },
  ],
};

const options = mockData.nodes.filter(x => x.group === 3).map(node => node.id);

const WebChartRoute: React.FC = () => {
  const [selectedType, setSelectedType] = useState("Texto");
  const [selectedGroup, setSelectedGroup] = useState("Ambos");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [selectedSimmetry, setSelectedSimmetry] = useState("Ambos");
  const [dateInitial, setDateInitial] = useState("");
  const [dateFinal, setDateFinal] = useState("");

  // Filtragem dos nós e links
  const filteredData = useMemo(() => {
    let links = mockData.links;

    // Filtro por datas
    if (dateInitial || dateFinal) {
      links = links.filter((link) => {
        const linkDate = dayjs(link.date);
        const afterInitial = dateInitial ? (linkDate.isAfter(dayjs(dateInitial)) || linkDate.isSame(dayjs(dateInitial))) : true;
        const beforeFinal = dateFinal ? (linkDate.isBefore(dayjs(dateFinal)) || linkDate.isSame(dayjs(dateFinal))) : true;
        return afterInitial && beforeFinal;
      });
    }

    // Filtro por alvos selecionados
    if (selectedOptions.length > 0) {
      links = links.filter((link) =>
        selectedOptions.includes(link.source) || selectedOptions.includes(link.target)
      );
    }

    // Filtro por Grupo
    if (selectedGroup !== "Ambos") {
      if (selectedGroup === "Grupo") {
        links = links.filter((link) => {
          const sourceNode = mockData.nodes.find(n => n.id === link.source);
          const targetNode = mockData.nodes.find(n => n.id === link.target);
          return (sourceNode?.group === 4 || targetNode?.group === 4);
        });
      } else if (selectedGroup === "Número") {
        links = links.filter((link) => {
          const sourceNode = mockData.nodes.find(n => n.id === link.source);
          const targetNode = mockData.nodes.find(n => n.id === link.target);
          return (sourceNode?.group !== 4 && targetNode?.group !== 4);
        });
      }
    }

    // Filtro de Simetria
    if (selectedSimmetry !== "Ambos") {
      links = links.filter((link) => {
        const sourceNode = mockData.nodes.find(n => n.id === link.source);
        const targetNode = mockData.nodes.find(n => n.id === link.target);
        if (!sourceNode || !targetNode) return false;
        if (selectedSimmetry === "Simétricos") {
          return sourceNode.group === targetNode.group;
        } else if (selectedSimmetry === "Assimétricos") {
          return sourceNode.group !== targetNode.group;
        }
        return true;
      });
    }

    // Filtro por Tipo (apenas exemplo, pois não há campo de tipo real)
    // Aqui não há campo real, então não filtra nada

    // Agora, só exibe nós que participam de algum link visível
    const nodeIds = new Set(links.flatMap(l => [l.source, l.target]));
    const nodes = mockData.nodes.filter(n => nodeIds.has(n.id));

    return { nodes, links };
  }, [selectedOptions, selectedGroup, selectedType, selectedSimmetry, dateInitial, dateFinal]);

  return (
    <Box width="100%" bgcolor="#F8F8F8" height="100vh" display="flex" flexDirection="column" padding="1rem 0 0 0">
      <Box display="flex" flexDirection="column" gap="1rem" px="1rem">
      <Box sx={{ width: "fit-content", minWidth: "25rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <Typography fontFamily={"Inter, sans-serif"} fontWeight={600} fontSize={"1.25rem"}>Seleção de Alvos</Typography>
        <MultiSelect style="gray" placeholder="Selecione os nomes" height="53px" options={options} selectedOptions={selectedOptions} onChange={setSelectedOptions} />
      </Box>

        <Box width="100%" display="flex" py="0.7rem" flexDirection="column" gap="0.5rem">
          <Typography variant="caption" fontFamily="Inter, sans-serif" fontWeight={600}>
            Filtrar por:
          </Typography>

          <Box display="flex" flexDirection="row" flexWrap="wrap" gap="2rem">
            <TextField
              select
              label="Grupo"
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
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
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              sx={focusedTextFieldStyles}
            >
              <MenuItem value="Texto" sx={menuItemStyles}>Texto</MenuItem>
              <MenuItem value="Vídeo" sx={{ ...menuItemStyles, "&.Mui-selected": { backgroundColor: "transparent" } }}>
                Vídeo
              </MenuItem>
              <MenuItem value="Todos" sx={menuItemStyles}>Todos</MenuItem>
            </TextField>

            <TextField
              select
              label="Simetria"
              value={selectedSimmetry}
              onChange={(e) => setSelectedSimmetry(e.target.value)}
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
              onChange={e => setDateInitial(e.target.value)}
              sx={{ ...focusedTextFieldStyles, minWidth: "8rem" }}
            />

            <TextField
              id="date-final"
              InputLabelProps={{ shrink: true }}
              label="Data Final"
              type="date"
              value={dateFinal}
              onChange={e => setDateFinal(e.target.value)}
              sx={{ ...focusedTextFieldStyles, minWidth: "8rem" }}
            />
          </Box>
        </Box>
      </Box>

      <Box
        flex={1}
        bgcolor="#D3D3D3"
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

export default WebChartRoute;
