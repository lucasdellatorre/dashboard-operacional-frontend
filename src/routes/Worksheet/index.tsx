import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { GenericData, HeadCell } from "../../interface/table/tableInterface";
import GenericTable from "../../components/Table/Table";
import { useWorksheets } from "../../hooks/useWorksheets";
import { useHeaderInput } from "../../hooks/useHeaderInput";

export interface Worksheet extends GenericData {
  id: number;
  label: string;
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

  const operationsSelected = () => {
    navigate("/operacoes");
  };
  const { headerInputValue } = useHeaderInput();
  const { filteredWorksheets } = useWorksheets({
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
    </Box>
  );
};

export default Worksheet;
