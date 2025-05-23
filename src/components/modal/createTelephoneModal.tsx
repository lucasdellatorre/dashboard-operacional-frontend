import {
  Box,
  Button,
  Dialog,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CloseIcon from "@mui/icons-material/Close";
import { z } from "zod";

const telephoneModalSchema = z.object({
  telephone: z
    .string({ required_error: "Telefone é obrigatório" })
    .min(6, "Número muito curto")
    .max(15, "Número muito longo"),
});

type TelephoneFormData = z.infer<typeof telephoneModalSchema>;

interface TelephoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TelephoneFormData) => void;
  initialData?: TelephoneFormData | null;
}

const TelephoneModal: React.FC<TelephoneModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TelephoneFormData>({
    resolver: zodResolver(telephoneModalSchema),
    defaultValues: {
      telephone: initialData ? initialData.telephone : "",
    },
    shouldUnregister: true,
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({ telephone: "" });
    }
  }, [initialData, reset]);

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
        display="flex"
        flexDirection="column"
        alignItems="center"
        mb="0.8rem"
      >
        <Typography sx={{ fontWeight: "900", fontSize: "1.2rem" }}>
          {initialData ? "Editar Telefone" : "Adicionar Telefone"}
        </Typography>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        gap="1.5rem"
        alignItems="center"
      >
        <Box
          sx={{ width: "100%" }}
          display="flex"
          flexDirection="column"
          gap="0.3rem"
        >
          <Typography sx={{ fontWeight: "800", fontSize: "1rem" }}>
            Telefone*
          </Typography>
          <Controller
            control={control}
            name="telephone"
            render={({ field }) => (
              <TextField
                {...field}
                onBlur={field.onBlur}
                placeholder="Digite o telefone"
                variant="outlined"
                InputProps={{
                  sx: {
                    height: "2.5rem",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(0, 0, 0, 0.23)",
                    },
                  },
                }}
              />
            )}
          />
          {errors.telephone && (
            <Typography color="error" variant="caption">
              {errors.telephone.message}
            </Typography>
          )}
        </Box>

        <Button
          onClick={handleSubmit((data) => {
            if (onSubmit) {
              onSubmit(data);
              reset();
              onClose();
            }
          })}
          sx={{
            bgcolor: "customButton.gold",
            color: "customText.white",
            textTransform: "none",
            fontWeight: 600,
            width: "100%",
          }}
        >
          {initialData ? "Salvar alterações" : "Adicionar telefone"}
        </Button>
      </Box>
    </Dialog>
  );
};

export default TelephoneModal;
