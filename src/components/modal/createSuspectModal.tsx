import {
  Box,
  Button,
  Dialog,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import MultiSelect from "../multiSelect";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CloseIcon from "@mui/icons-material/Close";
import { z } from "zod";

const addSuspectModalSchema = z.object({
  suspectName: z
    .string({
      required_error: "Nome do suspeito é obrigatório",
    })
    .min(1, "Nome do suspeito não pode estar vazio"),

  suspectNumbers: z
    .array(z.string())
    .min(1, "Deve fornecer pelo menos um número")
    .nonempty("Lista de números não pode estar vazia"),

  suspectOperation: z
    .array(z.string())
    .min(1, "Deve fornecer pelo menos uma operação")
    .nonempty("Lista de operações não pode estar vazia"),
});

interface CreateSuspectModalProps {
  isOpen: boolean;
  onClose: () => void;
}
type addSuspectlSchemaType = z.infer<typeof addSuspectModalSchema>;
const CreateSuspectModal: React.FC<CreateSuspectModalProps> = ({
  isOpen,
  onClose,
}) => {
  const operation = [
    "Operação A",
    "Operação B",
    "Operação C",
    "Operação D",
    "Operação E",
    "Operação F",
    "Operação G",
    "Operação H",
  ];
  const suspectNumbers = ["(54) 997088840", "(51) 98394938", "(51) 98494938"];
  const handleChangeSuspectOperations = (selected: string[]) => {
    setValue("suspectOperation", selected as [string, ...string[]]);
  };
  const handleChangeSuspectNumber = (selected: string[]) => {
    setValue("suspectNumbers", selected as [string, ...string[]]);
  };
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<addSuspectlSchemaType>({
    mode: "all",
    resolver: zodResolver(addSuspectModalSchema),
    defaultValues: {
      suspectName: "",
      suspectNumbers: [],
      suspectOperation: [],
    },
  });

  return (
    <Dialog
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "10px",
          padding: "1.875rem",
          position: "absolute",
          top: "50%",
          left: "55%",
          transform: "translate(-50%, -50%)",
          margin: 0,
        },
      }}
      open={isOpen}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
    >
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <Box
        alignItems={"center"}
        display="flex"
        flexDirection="column"
        marginBottom={"0.8rem"}
      >
        <Typography sx={{ fontWeight: "900", fontSize: "1.2rem" }}>
          Criação Alvos
        </Typography>
      </Box>
      <Box
        display={"flex"}
        flexDirection="column"
        gap="1.5rem"
        alignItems={"center"}
      >
        <Box
          sx={{ width: "100%" }}
          display={"flex"}
          flexDirection="column"
          gap="0.3rem"
        >
          <Typography sx={{ fontWeight: "800", fontSize: "1rem" }}>
            Apelido do Alvo*
          </Typography>
          <Controller
            control={control}
            name={"suspectName"}
            render={({ field }) => (
              <TextField
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder="Digite o apelido do alvo"
                variant="outlined"
                InputLabelProps={{ shrink: false }}
                InputProps={{
                  notched: false,
                  sx: {
                    height: "2.5rem",
                    width: "100%",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(0, 0, 0, 0.23)",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(0, 0, 0, 0.23)",
                      borderWidth: "1px",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(0, 0, 0, 0.23)",
                    },
                  },
                }}
              />
            )}
          />
          <Box sx={{ height: "1.5rem" }}>
            {errors.suspectName && (
              <Typography color="error" variant="caption">
                {typeof errors.suspectName === "string"
                  ? errors.suspectName
                  : errors.suspectName.message ||
                    "Nome do suspeito é obrigatório"}
              </Typography>
            )}
          </Box>
        </Box>

        <Box
          sx={{ width: "100%" }}
          display={"flex"}
          flexDirection="column"
          gap="0.4rem"
        >
          <Typography sx={{ fontWeight: "800", fontSize: "1rem" }}>
            Números viculados a esse alvo*
          </Typography>
          <Controller
            control={control}
            name={"suspectNumbers"}
            render={({ field }) => (
              <MultiSelect
                placeholder="Selecione os números"
                height="2.5rem"
                options={suspectNumbers}
                selectedOptions={field.value}
                onChange={(selected) => {
                  handleChangeSuspectNumber(selected);
                }}
              />
            )}
          />
          <Box sx={{ height: "1.5rem" }}>
            {errors.suspectNumbers && (
              <Typography color="error" variant="caption">
                {typeof errors.suspectNumbers === "string"
                  ? errors.suspectNumbers
                  : errors.suspectNumbers.message ||
                    "Nome do suspeito é obrigatório"}
              </Typography>
            )}
          </Box>
        </Box>

        <Box
          sx={{ width: "100%" }}
          display={"flex"}
          flexDirection="column"
          gap="0.4rem"
        >
          <Typography sx={{ fontWeight: "800", fontSize: "1rem" }}>
            Operações vinculadas para esse alvo*
          </Typography>
          <Controller
            control={control}
            name={"suspectOperation"}
            render={({ field }) => (
              <MultiSelect
                placeholder="Selecione as operações"
                height="2.5rem"
                options={operation}
                selectedOptions={field.value}
                onChange={(selected) => {
                  handleChangeSuspectOperations(selected);
                }}
              />
            )}
          />

          <Box sx={{ height: "1.5rem" }}>
            {errors.suspectOperation && (
              <Typography color="error" variant="caption">
                {typeof errors.suspectOperation === "string"
                  ? errors.suspectOperation
                  : errors.suspectOperation.message ||
                    "Nome do suspeito é obrigatório"}
              </Typography>
            )}
          </Box>
        </Box>
        <Button
          onClick={handleSubmit((data) => {
            console.log(data);
            reset();
            onClose();
          })}
          sx={{
            bgcolor: "customButton.gold",
            color: "customText.white",
            textTransform: "none",
            fontWeight: 600,
            width: "100%",
          }}
        >
          Criar alvo
        </Button>
      </Box>
    </Dialog>
  );
};

export default CreateSuspectModal;
