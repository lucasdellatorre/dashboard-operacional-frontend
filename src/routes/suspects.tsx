import { Box, Typography } from "@mui/material";
import React from "react";
import SuspectCard from "../components/suspectCard";

const Suspects: React.FC = () => {
  const mockSuspects = [
    {
      name: "Zé Pequeno",
      isRelevant: true,
      id: "#1s2b2a36i8 ",
    },
    {
      name: "Inácio",
      isRelevant: true,
      id: "#1s2b2a3409",
    },
    {
      name: "Fernando",
      isRelevant: false,
      id: "#1s2b2a3h68",
    },
    {
      name: "Geraldo",
      isRelevant: false,
      id: "#1s2b2a9836",
    },
  ];
  return (
    <Box
      width={"100%"}
      display={"flex"}
      height={"100vh"}
      alignItems={"stretch"}
      overflow={"hidden"}
      justifyContent={"center"}
      sx={{
        backgroundPosition: "center",
      }}
    >
      <Box
        bgcolor={"customBackground.primary"}
        width={"100%"}
        display={"flex"}
        flexDirection={"column"}
        flex={1}
      >
        <Box
          bgcolor={"customBackground.secondary"}
          borderBottom={1}
          px={"1.5rem"}
          py="1rem"
          borderTop={1}
          display={"flex"}
          flexDirection={"column"}
          borderColor={"border.primary"}
        >
          <Typography
            fontSize={"0.75rem"}
            fontWeight={400}
            color={"customText.gray"}
          >
            Seleção de visualização
          </Typography>
          <p>filtro</p>
        </Box>
        <Box
          paddingLeft={"1.75rem"}
          paddingTop={"1.875rem"}
          display={"flex"}
          flexDirection={"column"}
          gap="1.5rem"
        >
          <Typography
            fontSize={"1.239rem"}
            fontWeight={800}
            color={"customText.black"}
          >
            Selecione um alvo para iniciar investigação
          </Typography>
          <Box display="flex" flexDirection="row" flexWrap="wrap" gap="2.5rem">
            {mockSuspects.map((suspect) => (
              <SuspectCard
                name={suspect.name}
                id={suspect.id}
                isRelevant={suspect.isRelevant}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Suspects;
