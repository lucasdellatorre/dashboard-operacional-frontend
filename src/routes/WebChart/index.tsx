import { Box, MenuItem, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import WebChart from "../../components/dashboard/WebChart/WebChart";
import MultiSelect from "../../components/multiSelect";

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
    // Alvo 1 - Interceptadores 1-8
    { source: "Alvo 1", target: "Marinho", value: 342 },
    { source: "Alvo 1", target: "(11) 91234-5678", value: 128 },
    { source: "Alvo 1", target: "(21) 99876-5432", value: 64 },
    { source: "Alvo 1", target: "(21) 98765-1234", value: 237 },
    { source: "Alvo 1", target: "(31) 97654-3210", value: 70 },
    { source: "Alvo 1", target: "(31) 96543-2109", value: 156 },
    { source: "Alvo 1", target: "Fernandinho", value: 572 },
    { source: "Alvo 1", target: "(41) 94321-0987", value: 321 },

    // Alvo 2 - Interceptadores 9-16
    { source: "Alvo 2", target: "(51) 93210-9876", value: 454 },
    { source: "Alvo 2", target: "(51) 92109-8765", value: 189 },
    { source: "Alvo 2", target: "(61) 91098-7654", value: 18 },
    { source: "Alvo 2", target: "(61) 90987-6543", value: 567 },
    { source: "Alvo 2", target: "Pablo", value: 278 },
    { source: "Alvo 2", target: "(71) 98765-4321", value: 543 },
    { source: "Alvo 2", target: "(81) 97654-3210", value: 109 },
    { source: "Alvo 2", target: "(81) 96543-2109", value: 12 },

    // Alvo 3 - Interceptadores 17-23
    { source: "Alvo 3", target: "(85) 95432-1098", value: 398 },
    { source: "Alvo 3", target: "(85) 94321-0987", value: 521 },
    { source: "Alvo 3", target: "(91) 93210-9876", value: 145 },
    { source: "Alvo 3", target: "(91) 92109-8765", value: 50 },
    { source: "Alvo 3", target: "(47) 91098-7654", value: 234 },
    { source: "Alvo 3", target: "(47) 90987-6543", value: 56 },
    { source: "Alvo 3", target: "(27) 99876-5432", value: 312 },

    // Alvo 4 - Interceptadores 24-30
    { source: "Alvo 4", target: "(27) 98765-4321", value: 589 },
    { source: "Alvo 4", target: "(19) 97654-3210", value: 22 },
    { source: "Alvo 4", target: "(19) 96543-2109", value: 123 },
    { source: "Alvo 4", target: "(67) 95432-1098", value: 578 },
    { source: "Alvo 4", target: "(67) 94321-0987", value: 345 },
    { source: "Alvo 4", target: "(83) 93210-9876", value: 501 },
    { source: "Alvo 4", target: "(83) 92109-8765", value: 467 },

    // Conexões cruzadas (interceptadores conectados a múltiplos alvos)
    { source: "Alvo 1", target: "(61) 90987-6543", value: 523 },
    { source: "Alvo 2", target: "(21) 98765-1234", value: 554 },
    { source: "Alvo 3", target: "(41) 94321-0987", value: 512 },
    { source: "Alvo 4", target: "(81) 96543-2109", value: 535 },
    { source: "Alvo 1", target: "(91) 92109-8765", value: 478 },
    { source: "Alvo 2", target: "(27) 98765-4321", value: 589 },
    { source: "Alvo 3", target: "(67) 94321-0987", value: 543 },
    { source: "Alvo 4", target: "Marinho", value: 576 },
  ],
};

const options = mockData.nodes.filter(x => x.group === 3).map(node => node.id);

const WebChartRoute: React.FC = () => {
  const [selectedType, setSelectedType] = useState("Texto");
  const [selectedGroup, setSelectedGroup] = useState("Ambos");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

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

            <TextField select label="Simetria" sx={focusedTextFieldStyles}>
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
              sx={focusedTextFieldStyles}
            />

            <TextField
              id="date-final"
              InputLabelProps={{ shrink: true }}
              label="Data Final"
              type="date"
              sx={focusedTextFieldStyles}
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
          <WebChart data={mockData} />
        </Box>
      </Box>
    </Box>
  );
};

export default WebChartRoute;
