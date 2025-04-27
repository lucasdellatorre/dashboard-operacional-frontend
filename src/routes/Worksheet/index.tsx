import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeadCell } from "../../interface/table/tableInterface";
import GenericTable from "../../components/Table/Table";
import { useWorksheets, WorkSheet } from "../../hooks/useWorksheets";
import { useHeaderInput } from "../../hooks/useHeaderInput";
import UploadWorksheetModal from "../../components/modal/uploadWorksheetModal";

const Worksheet: React.FC = () => {
  const navigate = useNavigate();

  const workSheetsHeaderCells: readonly HeadCell<WorkSheet>[] = [
    {
      id: "worksheet",
      label: "Planilhas",
    },
    {
      id: "size",
      label: "Tamanho do arquivo",
    },    
    {
      id: "insertedBy",
      label: "Adicionado por",
    },
    {
      id: "operationName",
      label: "Operações",
    },
    {
      id: "date",
      label: "Data de Inserção",
    },    
  ];

  const operationsSelected = () => { navigate("/operacoes"); };

  const [openModal, setOpenModal] = useState<boolean>(false);
  const { headerInputValue } = useHeaderInput();
  const { filteredWorksheets, addWorksheet } = useWorksheets({
    searchTerm: headerInputValue,
  });

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

      <GenericTable
        rows={filteredWorksheets}
        headCells={workSheetsHeaderCells}
        title="Planilhas"
        defaultOrderBy="suspectName"
        onSelectionChange={() => {}}
        initialSelected={[]}
        noDataMessage="Nenhuma planilha encontrada"
        onDelete={() => {}}
      />
      <Box sx={{ width: "100%", display: "flex", justifyContent: "end" }}>
        <Button
          onClick={operationsSelected}
          sx={{
            bgcolor: "customButton.black",
            color: "customText.white",
            fontWeight: 600,
            textTransform: "none",
            "&.Mui-disabled": {
              bgcolor: "customText.grey",
              color: "customText.lightGrey",
              cursor: "not-allowed",
            },
          }}
        >
          Próximo
        </Button>
      </Box>
      <UploadWorksheetModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onUploadSuccess={(file) => {
          setOpenModal(false);

          const cpf = localStorage.getItem("cpf") || "000.000.000-00";
          addWorksheet(
            file.name,
            file.size.toString(),
            cpf,
            new Date().toLocaleDateString("pt-BR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
          );
        }}

        existingFiles={filteredWorksheets.map((worksheet) => worksheet.worksheet)}
      />
    </Box>
  );
};

export default Worksheet;

