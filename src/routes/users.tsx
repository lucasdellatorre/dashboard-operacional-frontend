import { Flex, Text } from "@chakra-ui/react";
import React from "react";

const Users: React.FC = () => {
  return (
    <Flex
      w="100%"
      bgPos="center"
      backgroundColor="background.primary"
      h="100%"
      alignItems="center"
      overflow={"hidden"}
      justifyContent={"center"}
    >
      <Flex
        bg="primary"
        w="100%"
        px="2rem"
        pb={"1rem"}
        pt="1.2rem"
        flexDirection="column"
        h="100%"
        gap="1rem"
      >
        <Text color="text.white">Aqui é usuários</Text>
      </Flex>
    </Flex>
  );
};

export default Users;
