import React, { useState } from "react";
import NavigationBar from "./navigationBar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "./header";

const Layout: React.FC = () => {
  const [headerInputValue, setHeaderInputValue] = useState("");
  return (
    <Box
      width="100%"
      bgcolor={"customBackground.secondary"}
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      overflow="hidden"
      maxWidth={"2000px"}
      mx="auto"
    >
      <Box display={"flex"} height={"100vh"} overflow={"hidden"} flex={1}>
        <NavigationBar />
        <Box display="flex" flexDirection="column" flex="1" overflow="hidden">
          <Header
            inputValue={headerInputValue}
            setInputValue={setHeaderInputValue}
          />
          <Box
            display={"flex"}
            flex={1}
            flexDirection={"column"}
            height={"100%"}
            overflow={"auto"}
          >
            <Outlet context={{ headerInputValue, setHeaderInputValue }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
