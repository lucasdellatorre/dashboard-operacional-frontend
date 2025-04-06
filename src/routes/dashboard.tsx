import { Box, Typography } from "@mui/material";
import React from "react";

const Dashboard: React.FC = () => {
  return (
    <Box
      bgcolor={"customBackground.darkGray"}
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
        bgcolor={"primary.main"}
        width={"100%"}
        display={"flex"}
        px={"2rem"}
        pb={"1rem"}
        pt={"1.2rem"}
        flexDirection={"column"}
        flex={1}
        gap={"1rem"}
      >
        <Typography sx={{ color: "text.primary" }}>Aqui é dashboard</Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;
