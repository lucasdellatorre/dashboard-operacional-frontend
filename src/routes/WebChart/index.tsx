import { Box } from "@mui/material";
import React from "react";
import WebChart from "../../components/dashboard/WebChart/WebChart";

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
        p={1}
      >
        <Box
          width="100%"
          height="100%"
          borderRadius="8px"
          bgcolor="#000"
          boxShadow="0px 0px 20px rgba(0,0,0,0.6)"
          overflow="hidden"
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
