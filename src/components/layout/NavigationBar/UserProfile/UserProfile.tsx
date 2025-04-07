import { Box, Button, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const UserProfile: React.FC = () => {

  return (
    <Box p={2} display="flex" flexDirection="column" alignItems="flex-start">
      <AccountCircleIcon
        sx={{
          width: 128,
          height: 128,
          mb: 2,
          alignSelf: "center",
          color: "rgba(255, 255, 255, 0.7)",
          "@media (max-height: 800px)": {
            width: 100,
            height: 100,
          },
        }}
      />
      <Box
        width="100%"
        pb={2}
        mb={2}
        borderBottom="1px solid rgba(255, 255, 255, 0.1)"
      >
        <Typography
          fontFamily="'Inter', sans-serif"
          fontSize="1.125rem"
          fontWeight={700}
          lineHeight={1.4}
        >
          Informações do Alvo
        </Typography>
      </Box>
      <Box>
        <Typography
          fontFamily="'Inter', sans-serif"
          fontSize="0.625rem"
          fontWeight={400}
          mb={0.5}
          color="rgba(255, 255, 255, 0.7)"
        >
          Nome/Apelido:
        </Typography>
        <Box display="flex" alignItems="center" gap={0.5} mb={1.5}>
          <Typography
            fontFamily="'Inter', sans-serif"
            fontSize="1rem"
            fontWeight={500}
          >
            Zé Pequeno -
          </Typography>
          <Typography
            fontFamily="'Inter', sans-serif"
            fontSize="0.625rem"
            fontWeight={500}
            color="rgba(255, 255, 255, 0.7)"
          >
            ID:#1fs2b2a36i8
          </Typography>
        </Box>
        <Typography
          fontFamily="'Inter', sans-serif"
          fontSize="0.625rem"
          fontWeight={400}
          mb={0.5}
          color="rgba(255, 255, 255, 0.7)"
        >
          Celulares:
        </Typography>
        <Typography
          fontFamily="'Inter', sans-serif"
          fontSize="1rem"
          fontWeight={500}
          mb={2}
        >
          555190000-0000
        </Typography>
      </Box>
      <Button
        fullWidth
        sx={{
          bgcolor: "#4E4E4E",
          "&:hover": { bgcolor: "rgba(255, 255, 255, 0.15)" },
          textTransform: "none",
          py: 1,
        }}
      >
        <Typography
          fontFamily="'Inter', sans-serif"
          fontSize="0.875rem"
          fontWeight={600}
          color="white"
        >
          Ver detalhes
        </Typography>
      </Button>
    </Box>
  );
};

export default UserProfile;
