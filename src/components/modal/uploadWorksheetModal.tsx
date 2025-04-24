import { Box, Button, Dialog, IconButton, Typography } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CloseIcon from "@mui/icons-material/Close";
import { z } from "zod";
import UploadAreaInput from "../uploadAreaInput";
import MultiSelect from "../multiSelect";

const uploadModalSchema = z.object({
  uploadFile: z
    .string({
      required_error: "O upload de arquivo é obrigatório",
    })
    .min(1, "O upload de arquivo não pode estar vazio"),
  operations: z
    .array(z.string())
    .min(1, "Deve fornecer pelo menos uma operação")
    .nonempty("Lista de operações não pode estar vazia"),
});

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}
type uploadModalSchemaType = z.infer<typeof uploadModalSchema>;
const UploadWorksheetModal: React.FC<UploadModalProps> = ({
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
  const handleChangeOperations = (selected: string[]) => {
    setValue("operations", selected as [string, ...string[]]);
  };
  const handleFileSelected = (file: File) => {
    setValue("uploadFile", file.name);
  };
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<uploadModalSchemaType>({
    mode: "all",
    resolver: zodResolver(uploadModalSchema),
    defaultValues: {
      uploadFile: "",
      operations: [],
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
          Upload de planilha
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
          gap="0.4rem"
        >
          <Typography sx={{ fontWeight: "800", fontSize: "1rem" }}>
            Operações
          </Typography>
          <Controller
            control={control}
            name={"operations"}
            render={({ field }) => (
              <MultiSelect
                placeholder="Selecione as operações"
                height="2.5rem"
                options={operation}
                selectedOptions={field.value}
                onChange={(selected) => {
                  handleChangeOperations(selected);
                }}
              />
            )}
          />

          <Box sx={{ height: "1.5rem" }}>
            {errors.operations && (
              <Typography color="error" variant="caption">
                {typeof errors.operations === "string"
                  ? errors.operations
                  : errors.operations.message || "A operação é obrigatória"}
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
          <Controller
            control={control}
            name={"uploadFile"}
            render={({ field }) => (
              <UploadAreaInput onFileSelect={handleFileSelected} />
            )}
          />

          <Box sx={{ height: "1.5rem" }}>
            {errors.uploadFile && (
              <Typography color="error" variant="caption">
                {typeof errors.uploadFile === "string"
                  ? errors.uploadFile
                  : errors.uploadFile.message || "A operação é obrigatória"}
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
          Fazer Upload
        </Button>
      </Box>
    </Dialog>
  );
};

export default UploadWorksheetModal;
