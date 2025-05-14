import { Box, Button, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import GenericTable from "../../components/Table/Table";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useHeaderInput } from "../../hooks/useHeaderInput";
import { HeadCell } from "../../interface/table/tableInterface";
import { Targets, useSuspects } from "../../hooks/useSuspects";
import CreateSuspectModal from "../../components/modal/createSuspectModal";

const Suspects: React.FC = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const { headerInputValue } = useHeaderInput();
  const [selectedOperations, setSelectedOperations] = useState<Targets[]>([]);
  const [selectedIds, setSelectedIds] = useState<readonly number[]>([]);
  const operationId = searchParams.get("operacao");

  const suspectsHeaderCells: readonly HeadCell<Targets>[] = [
    {
      id: "suspectName",
      label: "Nome/Apelido",
    },
    {
      id: "number",
      label: "Número",
    },
    {
      id: "date",
      label: "Data de inserção",
    },
    {
      id: "relevance",
      label: "Relevância",
    },
    {
      id: "operationName",
      label: "Operações",
    },
    {
      id: "type",
      label: "Tipo",
    },
  ];

  const handleSelectionChange = useCallback(
    (selectedIds: readonly number[], selectedItems: Targets[]) => {
      setSelectedIds(selectedIds);
      setSelectedOperations(selectedItems);
    },
    [setSelectedOperations]
  );

  const { filteredSuspects } = useSuspects({
    searchTerm: headerInputValue,
  });

  const operationsSelected = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    const operationIds = selectedOperations
      .map((item: Targets) => item.id)
      .join("-");
    newSearchParams.set("operacao", operationId ?? "");
    newSearchParams.set("alvo", operationIds);
    navigate(`/dashboard?${newSearchParams.toString()}`);
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
          Selecione os alvos para exibição do dashboard
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
          Criar novo alvo
        </Button>
      </Box>

      <GenericTable
        rows={filteredSuspects}
        headCells={suspectsHeaderCells}
        title="Alvos"
        defaultOrderBy="suspectName"
        singleSelect={false}
        onSelectionChange={handleSelectionChange}
        initialSelected={selectedIds}
        noDataMessage="Nenhum alvo encontrado"
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
            },
          }}
        >
          Confirmar Seleção
        </Button>
      </Box>
      <CreateSuspectModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />
    </Box>
  );
};

export default Suspects;
