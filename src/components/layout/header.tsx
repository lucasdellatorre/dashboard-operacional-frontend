import { Flex, Text } from "@chakra-ui/react";
import React from "react";

const Header: React.FC = () => {
  return (
    <Flex position="sticky" top={0} zIndex={10} flexDirection="column">
      <Flex
        w="100%"
        bg="background.primary"
        justifyContent="space-between"
        alignItems="center"
        h={{ base: "3.5rem", md: "4.875rem" }}
        py={{ base: "0.5rem", md: "1rem" }}
        px={{ base: "1rem", md: "2rem", lg: "2rem" }}
        minW="max-content"
        overflow="hidden"
      >
        <Flex alignItems="center" minW={0}>
          {" "}
          <Text color="text.gold">
            {" "}
            Dashboard Operacional - Bem vindo, Usuário
          </Text>
        </Flex>
        <Text color="text.gold">Logout</Text>
      </Flex>
      <Flex
        w="100%"
        bg="background.secondary"
        h={{ base: "0.25rem", md: "0.5rem" }}
      />
    </Flex>
  );
};

export default Header;
