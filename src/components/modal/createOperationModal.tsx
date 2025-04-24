import {
  Box,
  Button,
  Dialog,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CloseIcon from "@mui/icons-material/Close";
import { z } from "zod";

const addOperationModalSchema = z.object({
  operationName: z
    .string({
      required_error: "Nome da operação é obrigatório",
    })
    .min(1, "Nome da operação não pode estar vazio"),
});

interface CreateOperationModalProps {
  isOpen: boolean;
  onClose: () => void;
}
type addOperationSchemaType = z.infer<typeof addOperationModalSchema>;
const CreateOperationModal: React.FC<CreateOperationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<addOperationSchemaType>({
    mode: "all",
    resolver: zodResolver(addOperationModalSchema),
    defaultValues: {
      operationName: "",
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
          Criação Operação
        </Typography>
      </Box>
      <Box
        display={"flex"}
        flexDirection="column"
        gap="1rem"
        alignItems={"center"}
      >
        <Box
          sx={{ width: "100%" }}
          display={"flex"}
          flexDirection="column"
          gap="0.3rem"
        >
          <Typography sx={{ fontWeight: "800", fontSize: "1rem" }}>
            Nome da operação*
          </Typography>
          <Controller
            control={control}
            name={"operationName"}
            render={({ field }) => (
              <TextField
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder="Digite o nome da operação"
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
            {errors.operationName && (
              <Typography color="error" variant="caption">
                {typeof errors.operationName === "string"
                  ? errors.operationName
                  : errors.operationName.message ||
                    "Nome da operação é obrigatório"}
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
          Criar operação
        </Button>
      </Box>
    </Dialog>
  );
};

export default CreateOperationModal;
