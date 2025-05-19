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
    // IPs - Grupo 1 (Azul Claro) - Turno da Manhã
    { id: "192.168.1.100", group: 1 },
    { id: "192.168.1.101", group: 1 },
    { id: "192.168.1.102", group: 1 },
    { id: "192.168.1.103", group: 1 },
    
    // IPs - Grupo 2 (Verde Claro) - Turno da Tarde
    { id: "10.0.0.50", group: 2 },
    { id: "10.0.0.51", group: 2 },
    { id: "10.0.0.52", group: 2 },
    { id: "10.0.0.53", group: 2 },
    
    // IPs - Grupo 3 (Roxo Claro) - Turno da Noite
    { id: "172.16.0.25", group: 3 },
    { id: "172.16.0.26", group: 3 },
    { id: "172.16.0.27", group: 3 },
    { id: "172.16.0.28", group: 3 },
    
    // Alvos (Grupo 4 - Vermelho) - Destaque
    { id: "Alvo 1", group: 4 },
    { id: "Alvo 2", group: 4 },
    { id: "Alvo 3", group: 4 },
    { id: "Alvo 4", group: 4 },
    { id: "Alvo 5", group: 4 },
    { id: "Alvo 6", group: 4 },
  ],
  links: [
    // Conexões entre IPs do Grupo 1 e Alvos
    { source: "192.168.1.100", target: "Alvo 1", value: 450 },
    { source: "192.168.1.100", target: "Alvo 2", value: 320 },
    { source: "192.168.1.101", target: "Alvo 2", value: 390 },
    { source: "192.168.1.102", target: "Alvo 3", value: 280 },
    { source: "192.168.1.103", target: "Alvo 4", value: 510 },
    { source: "192.168.1.100", target: "Alvo 5", value: 420 },
    
    // Conexões entre IPs do Grupo 2 e Alvos
    { source: "10.0.0.50", target: "Alvo 1", value: 290 },
    { source: "10.0.0.51", target: "Alvo 3", value: 280 },
    { source: "10.0.0.52", target: "Alvo 4", value: 510 },
    { source: "10.0.0.53", target: "Alvo 6", value: 380 },
    { source: "10.0.0.50", target: "Alvo 2", value: 290 },
    
    // Conexões entre IPs do Grupo 3 e Alvos
    { source: "172.16.0.25", target: "Alvo 3", value: 220 },
    { source: "172.16.0.26", target: "Alvo 4", value: 310 },
    { source: "172.16.0.27", target: "Alvo 1", value: 180 },
    { source: "172.16.0.28", target: "Alvo 5", value: 420 },
    { source: "172.16.0.25", target: "Alvo 6", value: 390 },
    
    // Conexões entre IPs da mesma rede
    { source: "192.168.1.100", target: "192.168.1.101", value: 150 },
    { source: "192.168.1.101", target: "192.168.1.102", value: 200 },
    { source: "192.168.1.102", target: "192.168.1.103", value: 180 },
    { source: "10.0.0.50", target: "10.0.0.51", value: 200 },
    { source: "10.0.0.51", target: "10.0.0.52", value: 190 },
    { source: "10.0.0.52", target: "10.0.0.53", value: 170 },
    { source: "172.16.0.25", target: "172.16.0.26", value: 180 },
    { source: "172.16.0.26", target: "172.16.0.27", value: 190 },
    { source: "172.16.0.27", target: "172.16.0.28", value: 200 },
    
    // Conexões cruzadas entre redes
    { source: "192.168.1.100", target: "10.0.0.50", value: 420 },
    { source: "10.0.0.51", target: "172.16.0.25", value: 290 },
    { source: "172.16.0.26", target: "192.168.1.101", value: 310 },
    { source: "192.168.1.102", target: "10.0.0.52", value: 380 },
    { source: "10.0.0.53", target: "172.16.0.27", value: 290 },
    { source: "172.16.0.28", target: "192.168.1.103", value: 310 },
    
    // Conexões cruzadas com alvos
    { source: "192.168.1.101", target: "Alvo 1", value: 380 },
    { source: "10.0.0.50", target: "Alvo 3", value: 290 },
    { source: "172.16.0.25", target: "Alvo 2", value: 310 },
    { source: "192.168.1.102", target: "Alvo 5", value: 320 },
    { source: "10.0.0.51", target: "Alvo 4", value: 350 },
    { source: "172.16.0.26", target: "Alvo 6", value: 270 },
  ],
};

const options = mockData.nodes.filter(x => x.group === 1).map(node => node.id);

const NetworkChartRoute: React.FC = () => {
  const [selectedType, setSelectedType] = useState("IP");
  const [selectedGroup, setSelectedGroup] = useState("Ambos");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  return (
    <Box width="100%" bgcolor="#F8F8F8" height="100vh" display="flex" flexDirection="column" padding="0">
      <Box display="flex" flexDirection="column" gap="0.5rem" px="1.5rem" py="0.5rem" style={{ minHeight: 0 }}>
        <Box sx={{ width: "100%", minWidth: "0", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          <Typography fontFamily={"Inter, sans-serif"} fontWeight={600} fontSize={"1.1rem"} mb={0.5} mt={0.5}>Seleção de IPs</Typography>
          <MultiSelect style="gray" placeholder="Selecione os IPs" height="40px" options={options} selectedOptions={selectedOptions} onChange={setSelectedOptions} />
        </Box>

        <Box width="100%" display="flex" py="0.2rem" flexDirection="column" gap="0.25rem">
          <Typography variant="caption" fontFamily="Inter, sans-serif" fontWeight={600} mb={0.5}>
            Filtrar por:
          </Typography>
          <Box display="flex" flexDirection="row" flexWrap="wrap" gap="1rem" alignItems="center">
            <TextField
              select
              label="Grupo"
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              sx={{ ...focusedTextFieldStyles, minWidth: "8rem", backgroundColor: "transparent" }}
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
              <MenuItem value="IP" sx={menuItemStyles}>IP</MenuItem>
              <MenuItem value="Interlocutor" sx={menuItemStyles}>Interlocutor</MenuItem>
              <MenuItem value="Todos" sx={menuItemStyles}>Todos</MenuItem>
            </TextField>

            <TextField select label="Simetria" sx={{ ...focusedTextFieldStyles, minWidth: "8rem" }} size="small">
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
              sx={{ ...focusedTextFieldStyles, minWidth: "8rem" }}
              size="small"
            />

            <TextField
              id="date-final"
              InputLabelProps={{ shrink: true }}
              label="Data Final"
              type="date"
              sx={{ ...focusedTextFieldStyles, minWidth: "8rem" }}
              size="small"
            />
          </Box>
        </Box>

        {/* Legenda dos Turnos */}
        <Box display="flex" gap="1.5rem" alignItems="center" mt="0.2rem" mb="0.2rem">
          <Typography variant="subtitle2" fontFamily="Inter, sans-serif" fontWeight={600} fontSize="0.95rem">
            Legenda de Turnos:
          </Typography>
          <Box display="flex" gap="0.7rem">
            <Box display="flex" alignItems="center" gap="0.3rem">
              <Box width="14px" height="14px" bgcolor="#808CBF" borderRadius="50%" />
              <Typography variant="body2" fontSize="0.95rem">Manhã</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap="0.3rem">
              <Box width="14px" height="14px" bgcolor="#31438C" borderRadius="50%" />
              <Typography variant="body2" fontSize="0.95rem">Tarde</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap="0.3rem">
              <Box width="14px" height="14px" bgcolor="#08102F" borderRadius="50%" />
              <Typography variant="body2" fontSize="0.95rem">Noite</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap="0.3rem">
              <Box width="14px" height="14px" bgcolor="#E57373" borderRadius="50%" />
              <Typography variant="body2" fontSize="0.95rem">Alvos</Typography>
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
          <WebChart data={mockData} />
        </Box>
      </Box>
    </Box>
  );
};

export default NetworkChartRoute; 