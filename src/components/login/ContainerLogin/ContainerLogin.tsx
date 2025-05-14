import { useState } from "react";
import { TextField, Box, Button, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

const isValidCPF = (cpf: string): boolean => {
  cpf = cpf.replace(/[^\d]+/g, "");

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let firstCheck = (sum * 10) % 11;
  if (firstCheck === 10 || firstCheck === 11) firstCheck = 0;
  if (firstCheck !== parseInt(cpf.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  let secondCheck = (sum * 10) % 11;
  if (secondCheck === 10 || secondCheck === 11) secondCheck = 0;
  if (secondCheck !== parseInt(cpf.charAt(10))) return false;

  return true;
};

const ContainerLogin: React.FC = () => {
  const [cpf, setCpf] = useState("");
  const [cpfError, setCpfError] = useState("");
  const [isPressed, setIsPressed] = useState(false);

  const navigate = useNavigate();

  const salvaCpf = () => {
    if (!isValidCPF(cpf)) {
      setCpfError("CPF inválido. Verifique e tente novamente.");
      return;
    }

    setCpfError(""); // limpa erro
    localStorage.setItem("cpf", cpf);
    navigate("/operacoes");
  };

  const formatCPF = (value: string): string => {
    const numericValue = value.replace(/\D/g, "");
    return numericValue
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      padding="2rem"
      gap="1.5rem"
      width="100%"
      maxWidth={{
        sm: "30rem",
        md: "35rem",
        lg: "49rem",
      }}
      sx={{
        background: "#FAFAFA",
        boxShadow: "0 0.25rem 1rem rgba(0, 0, 0, 0.15)",
        borderRadius: "1rem",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Campo de CPF */}
      <Box width="100%" display="flex" flexDirection="column" gap="0.5rem">
        <Typography
          sx={{
            fontSize: "1rem",
            color: "#000000",
            fontWeight: 500,
          }}
        >
          Digite o seu CPF
        </Typography>
        <TextField
          inputProps={{ maxLength: 14 }}
          type="text"
          placeholder="000.000.000-00"
          value={cpf}
          onChange={(e) => setCpf(formatCPF(e.target.value))}
          fullWidth
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "0.5rem",
              fontSize: "1rem",
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "customButton.gold",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "customButton.gold",
              },
            },
          }}
        />
        {cpfError && (
          <Typography color="error" fontSize="0.875rem">
            {cpfError}
          </Typography>
        )}
      </Box>

      <Button
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        onClick={salvaCpf}
        variant="contained"
        endIcon={<ArrowForwardIcon />}
        sx={{
          textTransform: "none",
          width: "100%",
          maxWidth: "45rem",
          height: "3rem",
          backgroundColor: "#C1A047",
          fontSize: "1.125rem",
          fontWeight: "600",
          fontFamily: "'Inter', sans-serif",
          transform: isPressed ? "scale(0.95)" : "scale(1)",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: "#b3953f",
          },
        }}
      >
        Entrar
      </Button>
    </Box>
  );
};

export default ContainerLogin;
