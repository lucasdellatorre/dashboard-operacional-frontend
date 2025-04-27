import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import BarChartGeneric from "../../components/dashboard/WebChart/BarChart";

const Dashboard: React.FC = () => {
  // Exemplo de dados
  const contacts = [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"
  ];
  const mensagensPorContato = [
    50, 37, 40, 425, 80,
    385, 90, 275, 490, 310,
    245, 380, 295, 410, 330
  ];
  const tamanhoTotalPorContato = [
    1200, 900, 1100, 8000, 1500,
    7000, 1600, 5000, 9000, 6000,
    4800, 7500, 5900, 8200, 6600
  ];

  const [expandedChart, setExpandedChart] = useState<"mensagens" | "tamanho" | null>(null);

  return (
    <Box
      sx={{
        bgcolor: "#1c1c1c",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: { xs: 2, sm: 4 },
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {expandedChart === null ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 3,
              width: "100%",
            }}
          >
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => setExpandedChart("mensagens")}
            >
              <BarChartGeneric
                contacts={contacts}
                data={mensagensPorContato}
                title="Mensagens por Contato"
                subtitle="Número de"
                tooltipLabel="Total"
                expanded={false}
              />
            </Box>
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => setExpandedChart("tamanho")}
            >
              <BarChartGeneric
                contacts={contacts}
                data={tamanhoTotalPorContato}
                title="Mensagens por Contato"
                subtitle="Tamanho total de"
                tooltipLabel="Tamanho"
                expanded={false}
              />
            </Box>
          </Box>
        ) : (
          <Box>
            <Button
              variant="outlined"
              sx={{
                mb: 2,
                color: "#fff",
                borderColor: "#fff",
                '&:hover': {
                  borderColor: "#fff",
                  backgroundColor: "rgba(255,255,255,0.1)"
                }
              }}
              onClick={() => setExpandedChart(null)}
            >
              Voltar
            </Button>
            <BarChartGeneric
              contacts={contacts}
              data={expandedChart === "mensagens" ? mensagensPorContato : tamanhoTotalPorContato}
              title="Mensagens por Contato"
              subtitle={expandedChart === "mensagens" ? "Número de" : "Tamanho total de"}
              tooltipLabel={expandedChart === "mensagens" ? "Total" : "Tamanho"}
              expanded={true}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
