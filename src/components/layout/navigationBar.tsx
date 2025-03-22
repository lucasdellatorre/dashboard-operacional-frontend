import { Box } from "@mui/material";
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
    <Box
      minHeight={"100vh"}
      width={"4.313rem"}
      bgcolor={"background.default"}
      display={"flex"}
      flexDirection={"column"}
      boxShadow={"4px 0px 15px rgba(0, 0, 0, 0.05)"}
      pt={"8.125rem"}
      px={"0.4rem"}
      position={"relative"}
      zIndex={1}
    >
      <Box
        sx={{
          position: "absolute",
          left: 0,
          width: "3px",
          height: "48px",
          bgcolor: "primary.main",
          borderTopRightRadius: "4px",
          borderBottomRightRadius: "4px",
          transition: "transform 0.2s ease-in-out",
          transform: boxTransform,
        }}
      />

      <Box
        sx={{
          p: "0.75rem",
          transition: "color 0.2s",
          display: "flex",
          gap: "2rem",
          flexDirection: "column",
        }}
      >
        <Link to="/">
          <FaHome color="#ffff" size={25} />
        </Link>
        <Link to="/usuarios">
          <FaUserCircle color="#ffff" size={25} />
        </Link>
      </Box>
    </Box>
  );
};

export default NavigationBar;
