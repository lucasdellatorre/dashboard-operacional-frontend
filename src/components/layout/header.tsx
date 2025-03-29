import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Header: React.FC = () => {
  return (
    <Box display={"flex"} flexDirection={"column"} position={"sticky"} top={0}>
      <Box
        width={"100%"}
        bgcolor={"background.default"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        overflow={"hidden"}
        minHeight={"max-content"}
        height="6rem"
      >
        <Box display="flex" alignItems="center" minWidth={0}>
          <Typography sx={{ color: "text.gold" }}>
            Dashboard Operacional - Bem vindo, Usuário
          </Typography>
        </Box>
        <Typography sx={{ color: "text.gold" }}>Logout</Typography>
      </Box>
      <Box height={"0.5rem"} bgcolor={"background.secondary"} />
    </Box>
  );
};

export default Header;
