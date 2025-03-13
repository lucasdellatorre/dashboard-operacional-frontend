import React from "react";
import Header from "./header";
import NavigationBar from "./navigationBar";
import { Outlet } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";

const Layout: React.FC = () => {
  return (
    <Flex
      w="100%"
      maxW="2000px"
      mx="auto"
      bg="background.terciary"
      flexDirection="column"
      minH="100vh"
      overflow="hidden"
    >
      <Flex flex="1" overflow="hidden">
        <NavigationBar />
        <Flex flexDirection="column" flex="1" overflow="hidden">
          <Header />
          <Box flex="1" overflowY="auto" position="relative">
            <Outlet />
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Layout;
