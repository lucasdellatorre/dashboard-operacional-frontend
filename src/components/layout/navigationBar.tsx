import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { FaHome, FaUserCircle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const NavigationBar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const pathPositions: Record<string, number> = {
    "/": 0,
    "/usuarios": 48,
  };

  const yPosition = pathPositions[currentPath] ?? pathPositions["/"];

  const boxTransform = `translateY(${yPosition}px)`;
  return (
    <Flex
      minH="100vh"
      w="4.313rem"
      backgroundColor="background.secondary"
      direction="column"
      boxShadow={"4px 0px 15px rgba(0, 0, 0, 0.05)"}
      pt="8.125rem"
      px="0.4rem"
      position="relative"
      zIndex={1}
    >
      <Box
        position="absolute"
        left="0"
        width="3px"
        height="48px"
        bg="brand.primary"
        borderTopRightRadius="4px"
        borderBottomRightRadius="4px"
        transition="transform 0.2s ease-in-out"
        transform={boxTransform}
      />

      <Flex p="0.75rem" transition="color 0.2s" gap="2rem" flexDir={"column"}>
        <Link to="/">
          <FaHome color="#ffff" size={25} />
        </Link>
        <Link to="/usuarios">
          <FaUserCircle color="#ffff" size={25} />
        </Link>
      </Flex>
    </Flex>
  );
};

export default NavigationBar;
