import { Box, Button, Typography } from "@mui/material";
import { textStyles } from "../../../../theme/typography";
import LogoutIcon from "@mui/icons-material/Logout";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";

const FooterButtons: React.FC = () => {
  return (
    <>
      <Box left={0} p={2}>
        <Button
          fullWidth
          sx={{
            bgcolor: "#121212",
            borderRadius: "8px",
            p: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            color: "white",
            textTransform: "none",
            "&:hover": {
              bgcolor: "rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          <DriveFolderUploadIcon sx={{ fontSize: 34 }} />
          <Typography
            sx={{
              ...textStyles.navigationBarTitle,
              mb: 0.5,
              textAlign: "left",
              width: "100%",
            }}
          >
            Upload de arquivos
          </Typography>
          <Typography
            sx={{
              ...textStyles.bodySmall,
              color: "rgba(255, 255, 255, 0.7)",
              textAlign: "left",
              width: "100%",
            }}
          >
            Clique aqui para inserir as planilhas de dados
          </Typography>
        </Button>
      </Box>

      {/* Botão de Logout */}
      <Box p={2}>
        <Button
          fullWidth
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            p: 1.5,
            borderRadius: "8px",
            color: "white",
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%)",
            transition: "all 0.3s ease",
            "&:hover": {
              background:
                "linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)",
              transform: "translateX(5px)",
            },
          }}
        >
          <LogoutIcon />
          <Typography
            sx={{ ...textStyles.titleMedium, textTransform: "capitalize" }}
          >
            Logout
          </Typography>
        </Button>
      </Box>
    </>
  );
};

export default FooterButtons;
