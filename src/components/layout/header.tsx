import React from "react";

import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import SearchBar from "./searchBar";

const Header: React.FC = () => {
  const mockedData = {
    name: "Mendonça",
  };

  function handleExport() {
    console.log("Exportando...");
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{
        backgroundColor: "#F7F7F7",
        borderBottom: "1px solid #eaeaea",
        boxShadow: "none",
        borderBottomWidth: "1px",
        borderBottomColor: "#E3E3E3",
      }}
    >
      {" "}
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0.75rem 1.5rem",
        }}
      >
        <Box>
          <Typography
            variant="h5"
            component="h1"
            sx={{
              fontWeight: "bold",
              color: "#191919",
              marginBottom: "0.25rem",
            }}
          >
            Dashboard Operacional
          </Typography>
          <Typography
            variant="subtitle1"
            component="p"
            sx={{
              fontSize: "0.9rem",
              color: "#565656",
            }}
          >
            Olá {mockedData.name}, seja bem vindo!
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            width: "50%",
          }}
        >
          <SearchBar
            placeholder="Procure aqui pelos alvos"
            onSearchChange={handleSearchChange}
          ></SearchBar>

          <Button
            sx={{
              padding: "0.5rem 1rem",
              fontWeight: "bold",
              textTransform: "none",
              backgroundColor: "#191919",
              color: "customButton.white",
              borderRadius: 25,

              "&:hover": {
                backgroundColor: "#333",
              },
            }}
            onClick={handleExport}
            startIcon={<ArrowOutwardRoundedIcon sx={{ scale: "2.5" }} />}
          >
            Exportar
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
