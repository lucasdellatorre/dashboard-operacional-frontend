import { Box, Typography } from "@mui/material";
import React from "react";

interface operationCardProps {
  title: string;
  id: string;
  onClick?: () => void;
}

const OperationCard: React.FC<operationCardProps> = ({ title, id, onClick }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        cursor: "pointer",
        position: "relative",
        width: "100%",
        paddingTop: "60%",
        borderRadius: "8px",
        transition: "all 0.2s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          "& .folder-tab": {
            bgcolor: "#1a1a1a",
          },
          "& .folder-body": {
            bgcolor: "#1a1a1a",
          }
        },
      }}
    >
      {/* Aba do papel */}
      <Box
        className="paper-tab"
        sx={{
          position: "absolute",
          top: "0%",
          left: "5%",
          right: "5%",
          width: "90%",
          height: "12%",
          bgcolor: "rgba(255, 255, 255, 0.9)",
          borderRadius: "12px 12px 0 0",
          transition: "all 0.2s ease",
          boxShadow: "0 -1px 2px rgba(0,0,0,0.1)",
          zIndex: 1,
        }}
      />
      {/* Aba da pasta */}
      <Box
        className="folder-tab"
        sx={{
          position: "absolute",
          top: "-8%",
          left: "0%",
          width: "45%",
          height: "40%",
          bgcolor: "#000000",
          borderRadius: "12px 48px 0 0",
          transition: "all 0.2s ease",
          boxShadow: "0 -2px 4px rgba(0,0,0,0.2)",
          zIndex: 0,
        }}
      />
      {/* Corpo da pasta */}
      <Box
        className="folder-body"
        sx={{
          position: "absolute",
          top: "7%",
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: "#000000",
          borderRadius: "12px",
          transition: "all 0.2s ease",
          boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          padding: 2,
          border: "1px solid rgba(255,255,255,0.1)",
          zIndex: 2,
        }}
      >
        <Typography
          sx={{
            color: "#FFFFFF",
            fontSize: "20px",
            fontFamily: "Inter, sans-serif",
            fontWeight: 600,
            textAlign: "center",
            width: "100%",
            overflow: "hidden",
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            color: "rgba(255, 255, 255, 0.6)",
            fontSize: "10px",
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
            textAlign: "center",
          }}
        >
          {id}
        </Typography>
      </Box>
    </Box>
  );
};

export default OperationCard;