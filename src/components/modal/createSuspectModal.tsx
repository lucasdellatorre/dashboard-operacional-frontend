import {
  Box,
  Button,
  Dialog,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import MultiSelect from "../multiSelect";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CloseIcon from "@mui/icons-material/Close";
import { z } from "zod";
import { isValidCPF } from "../../utils/validationUtils";

//Mocked Data
const suspectNumbers = ["(54) 997088840", "(51) 98394938", "(51) 98494937", "(51) 98494936", "(51) 98494935", "(51) 98494934", "(51) 98494933"];

const formatCPF = (value: string): string => {
  const numericValue = value.replace(/\D/g, "");
  return numericValue
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};

const addSuspectModalSchema = z.object({
  suspectNickname: z
    .string({
      required_error: "Apelido do suspeito é obrigatório",
    })
    .min(1, "Apelido do suspeito não pode estar vazio"),

  suspectNumbers: z
    .array(z.string())
    .min(1, "Deve fornecer pelo menos um número")
    .nonempty("Lista de números não pode estar vazia"),

  suspectCPF: z
    .string()
    .optional()
    .refine((cpf) => {
      const onlyDigits = cpf?.replace(/\D/g, "") || "";
      return onlyDigits.length == 11;
    }, {
      message: "CPF deve ter 11 dígitos",
    })
    .refine((cpf) => {
      const cleaned = cpf?.replace(/\D/g, "") || "";
      return !cpf || isValidCPF(cleaned);
    }, {
      message: "CPF inválido",
    }),

  suspectName: z.string().optional(),
}).refine((data) => {
  const { suspectNumbers } = data;
  return suspectNumbers.length > 0;

});

interface CreateSuspectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type addSuspectlSchemaType = z.infer<typeof addSuspectModalSchema>;

const CreateSuspectModal: React.FC<CreateSuspectModalProps> = ({ isOpen, onClose }) => {

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<addSuspectlSchemaType>({
    mode: "all",
    resolver: zodResolver(addSuspectModalSchema),
    defaultValues: {
      suspectName: "",
      suspectNumbers: [],
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        suspectName: "",
        suspectNumbers: [],
      });
    }
  }, [isOpen, reset]);

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
          <Typography sx={{ fontWeight: "600", fontSize: "1rem" }}>
            Apelido do Suspeito*
          </Typography>
          <Controller
            control={control}
            name={"suspectNickname"}
            render={({ field }) => (
              <TextField
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder="Digite o apelido do suspeito"
                variant="outlined"
                InputLabelProps={{ shrink: false }}
                InputProps={{
                  notched: false,
                  sx: {
                    height: "3.5rem",
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
          <Box>
            {errors.suspectNickname && (
              <Typography color="error" variant="caption">
                {typeof errors.suspectNickname === "string"
                  ? errors.suspectNickname
                  : errors.suspectNickname.message ||
                  "Apelido do suspeito é obrigatório"}
              </Typography>
            )}
          </Box>
        </Box>

        <Box
          sx={{ width: "100%" }}
          display={"flex"}
          flexDirection="column"
          gap="0.3rem"
        >
          <Typography sx={{ fontWeight: "600", fontSize: "1rem" }}>
            Nome do Suspeito
          </Typography>
          <Controller
            control={control}
            name={"suspectName"}
            render={({ field }) => (
              <TextField
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder="Digite o nome do suspeito"
                variant="outlined"
                InputLabelProps={{ shrink: false }}
                InputProps={{
                  notched: false,
                  sx: {
                    height: "3.5rem",
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
        </Box>

        <Box
          sx={{ width: "100%" }}
          display={"flex"}
          flexDirection="column"
          gap="0.4rem"
        >
          <Typography sx={{ fontWeight: "600", fontSize: "1rem" }}>
            Números vinculados a esse alvo*
          </Typography>
          <Controller
            control={control}
            name={"suspectNumbers"}
            render={({ field }) => (
              <MultiSelect
                style="white"
                placeholder="Selecione os números"
                height="3.5rem"
                options={suspectNumbers}
                selectedOptions={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <Box>
            {errors.suspectNumbers && (
              <Typography color="error" variant="caption">
                {errors.suspectNumbers.message}
              </Typography>
            )}
          </Box>
        </Box>

        <Box
          sx={{ width: "100%" }}
          display={"flex"}
          flexDirection="column"
          gap="0.3rem"
        >
          <Typography
            sx={{ fontWeight: "600", fontSize: "1rem" }}
          >
            CPF do Suspeito
          </Typography>
          <Controller
            control={control}
            name={"suspectCPF"}
            render={({ field }) => (
              <TextField
                inputProps={{ maxLength: 14 }}
                value={field.value}
                onChange={(value) => {
                  const formattedValue = formatCPF(value.target.value);
                  field.onChange(formattedValue);
                }
                }
                onBlur={field.onBlur}
                placeholder="Digite o CPF do suspeito"
                variant="outlined"
                InputLabelProps={{ shrink: false }}
                InputProps={{
                  notched: false,
                  sx: {
                    height: "3.5rem",
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
          <Box>
            {errors.suspectCPF && (
              <Typography color="error" variant="caption">
                {errors.suspectCPF.message}
              </Typography>
            )}
          </Box>
        </Box>

        <Button
          type="submit"
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
