import { Box } from "@mui/material";
import React from "react";
import UserProfile from "./UserProfile/UserProfile";
import NavigationButtons from "./NavigationButtons/NavigationButtons";
import FooterButtons from "./FooterButtons/FooterButtons";
import ToggleButton from "./ToggleButton/ToggleButton";
import { useLocation, useNavigate } from "react-router-dom";
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
  const location = useLocation();
  const isOperationsPage = location.pathname === "/operacoes";
  const isSuspectsPage = location.pathname === "/alvos";

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <Box
        height="100vh"
        width={isCollapsed ? "0px" : "20.75rem"}
        bgcolor="customBackground.darkGray"
        display="flex"
        flexDirection="column"
        boxShadow="4px 0px 15px rgba(0, 0, 0, 0.05)"
        position="relative"
        top={0}
        left={0}
        zIndex={1}
        color="white"
        overflow="hidden"
        sx={{
          transition: "width 0.7s ease-in-out",
          "@media (max-width: 1024px)": {
            width: isCollapsed ? "0px" : "16rem",
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
            opacity: isCollapsed ? 0 : 1,
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
          {isOperationsPage || isSuspectsPage ? (
            <Box
              component="img"
              src={logoPolicia}
              alt="Logo Polícia"
              width="160px"
              height="auto"
              mx="auto"
              my={2}
            />
          ) : (
            <UserProfile />
          )}
          <NavigationButtons />
          <FooterButtons logout={logout} />
        </Box>
      </Box>
      <ToggleButton isCollapsed={isCollapsed} onToggle={onToggle} />
    </>
  );
};

export default NavigationBar;
