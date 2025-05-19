import {
  Box,
  Button,
  Dialog,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { z } from "zod";
import UploadAreaInput from "../uploadAreaInput";
import MultiSelect from "../multiSelect";
import { Operation } from "../../hooks/useOperations";

const uploadModalSchema = z.object({
  uploadFile: z
    .instanceof(File, { message: "O upload de arquivo é obrigatório" })
    .refine((file) => /\.xlsx$/i.test(file.name), {
      message: "O arquivo deve estar no formato .xlsx",
    }),
  operations: z
    .array(z.string())
    .min(1, "Deve fornecer pelo menos uma operação")
    .nonempty("Lista de operações não pode estar vazia"),
});

type UploadModalForm = z.infer<typeof uploadModalSchema>;

interface UploadModalProps {
  isOpen: boolean;
  onUploadSuccess: (file: File) => void;
  onClose: () => void;
  existingFiles: string[];
  operationsList: Operation[];
}

const UploadWorksheetModal: React.FC<UploadModalProps> = ({
  isOpen,
  onUploadSuccess,
  onClose,
  existingFiles,
  operationsList
}) => {
  const [submitError, setSubmitError] = useState<string | null>(null);


  const {
    control,
    handleSubmit,
    reset,
    setValue,
    setError,      
    clearErrors, 
    formState: { errors },
  } = useForm<UploadModalForm>({
    mode: "all",
    resolver: zodResolver(uploadModalSchema),
    defaultValues: {
      uploadFile: undefined,
      operations: [],
    },
  });

  const handleChangeOperations = (selected: string[]) => {
    setValue("operations", selected as [string, ...string[]], {
      shouldValidate: true,
    });
  };

  const handleFileSelected = (file: File) => {
    // clear any previous duplicate-name error
    setSubmitError(null);

    if (!/\.xlsx$/i.test(file.name)) {
      setError("uploadFile", {
        type: "manual",
        message: "O arquivo deve estar no formato .xlsx",
      });
      return false;
    }
      clearErrors("uploadFile");
      setValue("uploadFile", file, { shouldValidate: true });

      return true;
  };

  const onSubmit = (data: UploadModalForm) => {
    const fileName = data.uploadFile.name;

    if (!/\.xlsx$/i.test(fileName)) {
      setSubmitError("O arquivo deve estar no formato .xlsx");
      return;
    }

    if (existingFiles.includes(fileName)) {
      setSubmitError("Já existe um arquivo com esse nome.");
      return;
    }
    setSubmitError(null);
    reset();
    onUploadSuccess(data.uploadFile);
  }
  
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
        alignItems="center"
        display="flex"
        justifyContent="center"
        marginBottom="0.8rem"
        gap="0.3rem"
      >
        <Typography sx={{ fontWeight: 900, fontSize: "1.2rem" }}>
          Upload de planilha
        </Typography>
        <Tooltip
          title="A planilha deve estar no formato .xlsx"
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

      <Box display="flex" flexDirection="column" gap="1rem" alignItems="center">
        <Box width="100%" display="flex" flexDirection="column" gap="0.4rem">
          <Typography sx={{ fontWeight: 800, fontSize: "1rem" }}>
            Operações*
          </Typography>
          <Controller
            control={control}
            name="operations"
            render={({ field }) => (
              <MultiSelect
                placeholder="Selecione as operações"
                height="2.5rem"
                options={operationsList.map((operation) => (operation.nome))}
                selectedOptions={field.value}
                onChange={handleChangeOperations} 
                style={"gray"} 
              />
            )}
          />
          <Box height="1.5rem">
            {errors.operations && (
              <Typography color="error" variant="caption">
                {errors.operations.message}
              </Typography>
            )}
          </Box>
        </Box>

        <Box width="100%" display="flex" flexDirection="column" gap="0.4rem">
          <Controller
            control={control}
            name="uploadFile"
            render={() => (
              <UploadAreaInput onFileSelect={handleFileSelected} />
            )}
          />
          <Box height="1.5rem">
            {errors.uploadFile && (
              <Typography color="error" variant="caption">
                {errors.uploadFile.message}
              </Typography>
            )}
          </Box>
        </Box>

        <Box width="100%">
          <Button
            fullWidth
            onClick={handleSubmit(onSubmit)}
            sx={{
              bgcolor: "customButton.gold",
              color: "customText.white",
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Fazer Upload
          </Button>
          {submitError && (
            <Typography color="error" variant="caption" sx={{ mt: 1 }}>
              {submitError}
            </Typography>
          )}
        </Box>
      </Box>
    </Dialog>
  );
};

export default UploadWorksheetModal;