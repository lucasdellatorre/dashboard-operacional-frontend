import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import MultiSelect from "./Select/Select";

type ModalValues = {
  apelido: string;
  operacoes: string[];
  numeros: string[];
};

type ModalProps = {
  open: boolean;
  onClose: () => void;
};

const mockNumeros: string[] = [
  "000000-0000",
  "000000-0001",
  "000000-0002",
  "000000-0003",
];

const mockOperacoes: string[] = [
  "Operações 1",
  "Operações 2",
  "Operações 3",
  "Operações 4",
];
("");
const Modal: React.FC<ModalProps> = ({ open, onClose }) => {
  const { handleSubmit, control, register } = useForm<ModalValues>({
    defaultValues: {
      apelido: "",
      numeros: [],
      operacoes: [],
    },
  });

  const onSubmit = (data: ModalValues) => {
    console.log("Form data:", data);
    onClose();
  };

  return (
    <Dialog
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "10px",
          padding: "30px",
        },
      }}
      open={true}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle sx={{ fontWeight: "bolder", textAlign: "center" }}>
        Criação Alvo
      </DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 3 }}
        >
          <Typography sx={{ fontWeight: "bold" }}>
            Apelidos do Alvo *
          </Typography>
          <TextField
            {...register("apelido", { required: true })}
            label="Escreva o apelido do alvo"
            variant="outlined"
            sx={{
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#221F1F",
              },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "#D9D9D9",
                },
              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "rgba(0, 0, 0, 0.23)",
                },
              borderColor: "rgba(0, 0, 0, 0.23)",
            }}
          />
          <Typography sx={{ fontWeight: "bold" }}>
            Números vinculados a esse alvo *
          </Typography>

          <MultiSelect
            name="numeros"
            label="Selecione o número aqui"
            options={mockNumeros}
            required={true}
            multiSelect={true}
            control={control}
          />
          <Typography sx={{ fontWeight: "bold" }}>
            Operações vinculadas a esse alvo *{" "}
          </Typography>

          <MultiSelect
            name="operacoes"
            label="Selecione a operação aqui"
            options={mockOperacoes}
            required={true}
            multiSelect={true}
            control={control}
          />
          <DialogActions sx={{ px: 0, justifyContent: "center" }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#9E833B",
                "&:hover": {
                  backgroundColor: "#9c7a21",
                },
                width: "80%",
              }}
            >
              Submit
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
