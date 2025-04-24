import { Box, Button, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import GenericTable from "../../components/operationSuspectTable/table";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useHeaderInput } from "../../hooks/useHeaderInput";
import { useOperations } from "../../hooks/useOperations";
import type { Operation } from "../../hooks/useOperations";
import { HeadCell } from "../../interface/operationSuspectTable/operationSuspectTableInterface";
import CreateOperationModal from "../../components/modal/createOperationModal";

const Operation: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { headerInputValue } = useHeaderInput();
  const [selectedOperations, setSelectedOperations] = useState<Operation[]>([]);
  const [selectedIds, setSelectedIds] = useState<readonly number[]>([]);

  const operationHeaderCells: readonly HeadCell<Operation>[] = [
    {
      id: "operationName",
      label: "Nome da operação",
    },
    {
      id: "operationDate",
      label: "Data da operação",
    },
    {
      id: "numberOfSuspects",
      label: "Número de alvos na operação",
    },
  ];

  const handleSelectionChange = useCallback(
    (selectedIds: readonly number[], selectedItems: Operation[]) => {
      setSelectedIds(selectedIds);
      setSelectedOperations(selectedItems);
    },
    [setSelectedOperations]
  );

  const { filteredOperations } = useOperations({
    searchTerm: headerInputValue,
  });

  const operationsSelected = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    const operationIds = selectedOperations
      .map((item: Operation) => item.id)
      .join("-");
    newSearchParams.set("operacao", operationIds);
    navigate(`/alvos?${newSearchParams.toString()}`);
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
          Selecione uma operação para iniciar a investigação
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
          Criar nova operação
        </Button>
      </Box>

      <GenericTable
        rows={filteredOperations}
        headCells={operationHeaderCells}
        title="Operações"
        defaultOrderBy="operationName"
        onSelectionChange={handleSelectionChange}
        initialSelected={selectedIds}
        noDataMessage="Nenhuma operação encontrada, por favor faça o upload da planilha"
        onDelete={() => {}}
      />
      <Box sx={{ width: "100%", display: "flex", justifyContent: "end" }}>
        <Button
          disabled={selectedIds.length === 0}
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
              fontFamily: "Inter, sans-serif",
            },
          }}
        >
          Confirmar Seleção
        </Button>
        <CreateOperationModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
        />
      </Box>
    </Box>
  );
};

export default Operation;
