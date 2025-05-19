import { Box, Button, Typography, CircularProgress, Alert } from "@mui/material";
import React, { useCallback, useContext, useState } from "react";
import { HeadCell } from "../../interface/table/tableInterface";
import GenericTable from "../../components/Table/Table";
import { useWorksheets, WorkSheet } from "../../hooks/useWorksheets";
import { useHeaderInput } from "../../hooks/useHeaderInput";
import UploadWorksheetModal from "../../components/modal/uploadWorksheetModal";
import { sheetController } from "../../controllers/sheetController";
import { useOperations } from "../../hooks/useOperations";
import { AppContext } from "../../context/AppContext";

const workSheetsHeaderCells: readonly HeadCell<WorkSheet>[] = [
  {
    id: "nome",
    label: "Planilha",
  },
  {
    id: "size",
    label: "Tamanho do arquivo",
  },
  {
    id: "data_upload",
    label: "Data de Upload",
  },
];

const Worksheet: React.FC = () => {
  const { setWorksheets } = useContext(AppContext);
  const [selectedIds, setSelectedIds] = useState<readonly number[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { headerInputValue } = useHeaderInput();
  const { filteredOperations } = useOperations({ searchTerm: "" });

  const { filteredWorksheets, addWorksheet, isLoading, error } = useWorksheets({
    searchTerm: headerInputValue,
  });
  
  const handleSelectionChange = useCallback(
    (selectedIds: readonly number[], selectedItems: WorkSheet[]) => {
      setSelectedIds(selectedIds);
      setWorksheets(selectedItems);
    },
    [setWorksheets]
  );

  const handleUpload = async (file: File, operation: string) => {
    try {
      const response = await sheetController.uploadSheet({ 
        file, 
        operacaoId: operation 
      });
      console.log("response", response);
      if (response.Message === "success") {
        setOpenModal(false);
        // Refresh the worksheets list
        addWorksheet(
          file.name,
          file.size,
          new Date().toISOString()
        );
      }
    } catch (error) {
      console.error("Error uploading sheet:", error);
    }
  };

  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error">
          Erro ao carregar as planilhas: {error.message}
        </Alert>
      </Box>
    );
  }

  return (
    <Box p={3} sx={{ fontFamily: "Inter, sans-serif" }}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"baseline"}
      >
        <Typography
          variant="h5"
          color="#000000"
          mb={4}
          fontWeight={700}
          sx={{ fontFamily: "Inter, sans-serif" }}
        >
          Histórico de Planilhas
        </Typography>

        <Button
          onClick={() => setOpenModal(true)}
          sx={{
            bgcolor: "customButton.gold",
            color: "customText.white",
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Upload de arquivos
        </Button>
      </Box>

      {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress />
        </Box>
      ) : (
        <GenericTable
          singleSelect={true}
          rows={filteredWorksheets}
          headCells={workSheetsHeaderCells}
          title="Planilhas"
          defaultOrderBy="nome"
          onSelectionChange={handleSelectionChange}
          initialSelected={selectedIds}
          noDataMessage="Nenhuma planilha encontrada"
          onDelete={() => {}}
        />
      )}
      <Box sx={{ width: "100%", display: "flex", justifyContent: "end" }}>
      </Box>
      <UploadWorksheetModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onUploadSuccess={handleUpload}
        existingFiles={filteredWorksheets.map(
          (worksheet) => worksheet.nome
        )}
        operationsList={filteredOperations}
      />
    </Box>
  );
};

export default Worksheet;
