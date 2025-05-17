import { Box } from "@mui/material";
import React from "react";
import NavigationButtons from "./NavigationButtons/NavigationButtons";
import { useNavigate } from "react-router-dom";
import logoPolicia from "../../../assets/logo-policia.svg";

interface NavigationBarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  isCollapsed,
  onToggle,
}) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <Box
        height="100vh"
        width={isCollapsed ? "3.7rem" : "20.75rem"}
        bgcolor="customBackground.darkGray"
        display="flex"
        flexDirection="column"
        position="relative"
        top={0}
        left={0}
        zIndex={1}
        color="white"
        overflow="hidden"
        sx={{
          transition: "width 0.7s ease-in-out",
          "@media (max-width: 1024px)": {
            width: isCollapsed ? "3.7rem" : "16rem",
          },
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          height="100%"
          width="20.75rem"
          overflow="auto"
          sx={{
            transition: "opacity 0.7s ease-in-out, width 0.7s ease-in-out",
            "&::-webkit-scrollbar": {
              width: "0px",
              background: "transparent",
            },
            "@media (max-width: 1024px)": {
              width: "16rem",
            },
          }}
        >
          <Box
            component="img"
            src={logoPolicia}
            alt="Logo Polícia"
            width={isCollapsed ? "0px" : "160px"}
            height="auto"
            mx="auto"
            my={isCollapsed ? 0 : 2}
            sx={{
              transition: "width 0.7s ease-in-out, margin 0.7s ease-in-out",
            }}
          />
          <NavigationButtons
            isCollapsed={isCollapsed}
            onToggle={onToggle}
            logout={logout}
          />
        </Box>
      </Box>
    </>
  );
};

export default NavigationBar;
