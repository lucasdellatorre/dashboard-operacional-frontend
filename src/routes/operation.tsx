import { Box, Typography, Stack } from "@mui/material";
import React, { useState, useMemo } from "react";
import FolderCard from "../components/operationCard";

const operations = [
  {
    title: "Castelo Branco",
    id: "ID:#1fs2b2a36i8",
    date: new Date("2024-03-20"),
    relevance: 5
  },
  {
    title: "Prainha",
    id: "ID:#1fs2b2a36i8",
    date: new Date("2024-03-19"),
    relevance: 3
  },
  {
    title: "Sucuri",
    id: "ID:#1fs2b2a36i8",
    date: new Date("2024-03-18"),
    relevance: 4
  },
  {
    title: "Nicotina",
    id: "ID:#1fs2b2a36i8",
    date: new Date("2024-03-17"),
    relevance: 2
  },
  {
    title: "Carne Fraca",
    id: "ID:#1fs2b2a36i8",
    date: new Date("2024-03-16"),
    relevance: 1
  }
];

type FilterType = 'recentes' | 'az' | 'relevantes';

const Operation: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('recentes');

  const filteredOperations = useMemo(() => {
    let sorted = [...operations];
    
    switch (activeFilter) {
      case 'recentes':
        return sorted.sort((a, b) => b.date.getTime() - a.date.getTime());
      case 'az':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case 'relevantes':
        return sorted.sort((a, b) => b.relevance - a.relevance);
      default:
        return sorted;
    }
  }, [activeFilter]);

  return (
    <Box 
      sx={{ 
        p: 3,
        fontFamily: "Inter, sans-serif",
      }}
    >
      <Box 
        sx={{ 
          display: "flex", 
          flexDirection: "column",
          gap: "0.5rem",
          mb: "2rem"
        }}
      >
        <Typography 
          sx={{ 
            fontSize: "0.875rem", 
            color: "#777779", 
            fontWeight: 400,
            fontFamily: "Inter, sans-serif",
          }}
        >
          Filtrar por:
        </Typography>

        {/* Container do Filtro */}
        <Box 
          sx={{ 
            width: "21.25rem",
            height: "2.688rem",
            bgcolor: "rgba(0, 0, 0, 0.05)",
            borderRadius: "0.5rem",
            position: "relative",
            display: "flex",
            padding: "0.25rem",
          }}
        >
          {/* Indicador de seleção animado */}
          <Box
            sx={{
              position: "absolute",
              width: "6.75rem",
              height: "2.188rem",
              bgcolor: "#FFFFFF",
              borderRadius: "0.5rem",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
              left: "0.25rem",
              top: "0.25rem",
              transform: activeFilter === 'recentes' 
                ? 'translateX(0)' 
                : activeFilter === 'az'
                ? 'translateX(7rem)'
                : 'translateX(14rem)',
            }}
          />

          {/* Container dos Botões */}
          <Box
            sx={{
              display: "flex",
              width: "100%",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Botão Recentes */}
            <Box
              onClick={() => setActiveFilter('recentes')}
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.875rem",
                  color: activeFilter === 'recentes' ? "#000000" : "rgba(0, 0, 0, 0.7)",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: activeFilter === 'recentes' ? 600 : 500,
                  transition: "all 0.2s ease",
                }}
              >
                Recentes
              </Typography>
            </Box>

            {/* Botão A-Z */}
            <Box
              onClick={() => setActiveFilter('az')}
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.875rem",
                  color: activeFilter === 'az' ? "#000000" : "rgba(0, 0, 0, 0.7)",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: activeFilter === 'az' ? 600 : 500,
                  transition: "all 0.2s ease",
                }}
              >
                A-Z
              </Typography>
            </Box>

            {/* Botão Relevantes */}
            <Box
              onClick={() => setActiveFilter('relevantes')}
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.875rem",
                  color: activeFilter === 'relevantes' ? "#000000" : "rgba(0, 0, 0, 0.7)",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: activeFilter === 'relevantes' ? 600 : 500,
                  transition: "all 0.2s ease",
                }}
              >
                Relevantes
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Typography 
        variant="h5" 
        sx={{ 
          color: "#000000", 
          mb: 4,
          fontWeight: 700,
          fontFamily: "Inter, sans-serif",
        }}
      >
        Selecione uma operação para iniciar investigação
      </Typography>

      <Stack 
        direction="row" 
        spacing={1.5} 
        sx={{ 
          width: '100%',
          mx: -1 
        }}
      >
        {filteredOperations.map((operation, index) => (
          <Box 
            key={index}
            sx={{ 
              width: {
                xs: '100%',
                sm: '50%',
                md: '33.33%',
                lg: '20%'
              },
              p: 1,
              mb: 2
            }}
          >
            <FolderCard
              title={operation.title}
              id={operation.id}
              onClick={() => console.log(`Clicked on ${operation.title}`)}
            />
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default Operation;