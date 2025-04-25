import {
  Box,
  Button,
  Dialog,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { z } from "zod";
import UploadAreaInput from "../uploadAreaInput";
import MultiSelect from "../multiSelect";

const uploadModalSchema = z.object({
  uploadFile: z
    .instanceof(File, {
      message: "O upload de arquivo é obrigatório",
    }),
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
    setValue("uploadFile", file);
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
      uploadFile: undefined,
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
          overflow: "hidden",
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
        justifyContent={"center"}
        marginBottom={"0.8rem"}
        gap={"0.3rem"}
      >
        <Typography sx={{ fontWeight: "900", fontSize: "1.2rem" }}>
          Upload de planilha
        </Typography>
        <Tooltip
          title={
            "A planilha deve estar no formato .xlsx e conter as colunas obrigatórias: Especificações planilhas"
          }
          componentsProps={{
            tooltip: {
              sx: {
                backgroundColor: "#fff",
                borderRadius: "12px",
                color: "rgba(0, 0, 0, 0.87)",
                maxWidth: 220,
                border: "1px solid #dadde9",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
              },
            },
          }}
        >
          <IconButton size="small" sx={{ padding: 0 }}>
            <InfoOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
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
            Operações*
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
            render={() => (
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