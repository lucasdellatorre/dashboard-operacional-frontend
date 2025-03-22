import React from "react";
import NavigationBar from "./navigationBar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const Layout: React.FC = () => {
  return (
    <Box
      width="100%"
      bgcolor="background.default"
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      overflow="hidden"
      maxWidth={"2000px"}
      mx="auto"
    >
      <Box display={"flex"} height={"100vh"} overflow={"hidden"} flex={1}>
        <NavigationBar />
        <Box
          display={"flex"}
          flex={1}
          flexDirection={"column"}
          height={"100%"}
          overflow={"auto"}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
