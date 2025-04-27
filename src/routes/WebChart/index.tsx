import { Box } from "@mui/material";
import React from "react";
import WebChart from "../../components/dashboard/WebChart/WebChart";

const mockData = {
  nodes: [
    { id: "Alvo 1", group: 1 },
    { id: "Alvo 2", group: 1 },
    { id: "Alvo 3", group: 1 },
    { id: "Alvo 4", group: 1 },

    { id: "Interceptador 1", group: 2 },
    { id: "Interceptador 2", group: 2 },
    { id: "Interceptador 3", group: 2 },
    { id: "Interceptador 4", group: 2 },
    { id: "Interceptador 5", group: 2 },
    { id: "Interceptador 6", group: 2 },
    { id: "Interceptador 7", group: 2 },
    { id: "Interceptador 8", group: 2 },
    { id: "Interceptador 9", group: 2 },
    { id: "Interceptador 10", group: 2 },
    { id: "Interceptador 11", group: 2 },
    { id: "Interceptador 12", group: 2 },
    { id: "Interceptador 13", group: 2 },
    { id: "Interceptador 14", group: 2 },
    { id: "Interceptador 15", group: 2 },
    { id: "Interceptador 16", group: 2 },
    { id: "Interceptador 17", group: 2 },
    { id: "Interceptador 18", group: 2 },
    { id: "Interceptador 19", group: 2 },
    { id: "Interceptador 20", group: 2 },
    { id: "Interceptador 21", group: 2 },
    { id: "Interceptador 22", group: 2 },
    { id: "Interceptador 23", group: 2 },
    { id: "Interceptador 24", group: 2 },
    { id: "Interceptador 25", group: 2 },
    { id: "Interceptador 26", group: 2 },
    { id: "Interceptador 27", group: 2 },
    { id: "Interceptador 28", group: 2 },
    { id: "Interceptador 29", group: 2 },
    { id: "Interceptador 30", group: 2 },
  ],
  links: [
    { source: "Alvo 1", target: "Interceptador 1", value: 1 },
    { source: "Alvo 1", target: "Interceptador 2", value: 1 },
    { source: "Alvo 1", target: "Interceptador 3", value: 1 },
    { source: "Alvo 1", target: "Interceptador 4", value: 1 },
    { source: "Alvo 2", target: "Interceptador 5", value: 1 },
    { source: "Alvo 2", target: "Interceptador 6", value: 1 },
    { source: "Alvo 2", target: "Interceptador 7", value: 1 },
    { source: "Alvo 2", target: "Interceptador 8", value: 1 },
    { source: "Alvo 3", target: "Interceptador 9", value: 1 },
    { source: "Alvo 3", target: "Interceptador 10", value: 1 },
    { source: "Alvo 3", target: "Interceptador 11", value: 1 },
    { source: "Alvo 3", target: "Interceptador 12", value: 1 },
    { source: "Alvo 4", target: "Interceptador 13", value: 1 },
    { source: "Alvo 4", target: "Interceptador 14", value: 1 },
    { source: "Alvo 4", target: "Interceptador 15", value: 1 },
    { source: "Alvo 4", target: "Interceptador 16", value: 1 },

    { source: "Alvo 1", target: "Interceptador 4", value: 1 },
    { source: "Alvo 2", target: "Interceptador 4", value: 1 },
    { source: "Alvo 1", target: "Interceptador 8", value: 1 },
    { source: "Alvo 2", target: "Interceptador 8", value: 1 },
    { source: "Alvo 3", target: "Interceptador 12", value: 1 },
    { source: "Alvo 4", target: "Interceptador 12", value: 1 },
    { source: "Alvo 2", target: "Interceptador 5", value: 1 },
    { source: "Alvo 3", target: "Interceptador 5", value: 1 },
    { source: "Alvo 3", target: "Interceptador 9", value: 1 },
    { source: "Alvo 4", target: "Interceptador 9", value: 1 },
  ],
};

const WebChartRoute: React.FC = () => {
  return (
    <Box
      width="100%"
      height="100vh"
      display="flex"
      flexDirection="column"
      bgcolor="#0000"
    >
      <Box
        width="100%"
        height="150px"
        bgcolor="#0000"
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderBottom="1px solid #ccc"
      >
        <Box fontSize="24px" color="#333">
          Filtros (futuro)
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
          width="95%"
          height="90%"
          bgcolor="#000"
          borderRadius="20px"
          boxShadow="0px 0px 20px rgba(0,0,0,0.6)"
          overflow="hidden"
          display="flex"
          justifyContent="center"
          alignItems="center"
          p={2}
        >
          <WebChart data={mockData} />
        </Box>
      </Box>
    </Box>
  );
};

export default WebChartRoute;
