import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { GenericData, HeadCell } from "../../interface/table/tableInterface";
import GenericTable from "../../components/Table/Table";

export interface Worksheet extends GenericData {
  id: number;
  label: string;
}

export interface WorksheetData extends GenericData {
  id: number;
  worksheet: string;
  date: string;
}

const Worksheet: React.FC = () => {
  const navigate = useNavigate();

  const workSheetsHeaderCells: readonly HeadCell<Worksheet>[] = [
    {
      id: "worksheet",
      label: "Planilhas",
    },
    {
      id: "date",
      label: "Data de Inserção",
    },
  ];

  const mockWorksheets: WorksheetData[] = [
    {
      id: 1,
      worksheet: "Planilha 1",
      date: "2023-01-01",
    },
    {
      id: 2,
      worksheet: "Planilha 2",
      date: "2023-01-01",
    },
    {
      id: 3,
      worksheet: "Planilha 3",
      date: "2023-01-01",
    },
  ];

  const operationsSelected = () => {
    navigate("/operacoes");
  };

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
        rows={mockWorksheets}
        headCells={workSheetsHeaderCells}
        title="Planilhas"
        defaultOrderBy="suspectName"
        onSelectionChange={() => {}}
        initialSelected={[]}
        noDataMessage="Nenhum alvo encontrado"
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
    </Box>
  );
};

export default Worksheet;
