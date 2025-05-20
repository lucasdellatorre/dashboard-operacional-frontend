import { Box, Button, Typography, CircularProgress } from "@mui/material";
import React, { useCallback, useContext, useMemo, useState } from "react";
import GenericTable from "../../components/Table/Table";
import { useNavigate } from "react-router-dom";
import { useHeaderInput } from "../../hooks/useHeaderInput";
import { HeadCell } from "../../interface/table/tableInterface";
import { useSuspects, Suspect, Numbers } from "../../hooks/useSuspects";
import CreateSuspectModal from "../../components/modal/createSuspectModal";
import { AppContext } from "../../context/AppContext";

const Suspects: React.FC = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const { headerInputValue } = useHeaderInput();
  const { suspects: selectedSuspectsContext, numbers: selectedNumbersContext, setSuspects, setNumbers, operations } = useContext(AppContext);

  const [selectedSuspects, setSelectedSuspects] = useState<Suspect[]>(selectedSuspectsContext);
  const [selectedNumbers, setSelectedNumbers] = useState<Numbers[]>(selectedNumbersContext);

  const operationIds = useMemo(() => operations.map((op) => op.id), [operations]);

  const { suspects, numbers, loading, error } = useSuspects({
    searchTerm: headerInputValue,
    operationIds,
  });

const suspectHeadCells: readonly HeadCell<Suspect>[] = [
  { id: "apelido", label: "Nome/Apelido" },
  { id: "numeros", label: "Número" },
  { id: "data_criacao", label: "Data de inserção" },
  { id: "relevante", label: "Relevância" },
  { id: "operacoes", label: "Operações" },
];

const numberHeadCells: readonly HeadCell<Numbers>[] = [
  { id: "numero", label: "Número" },
  { id: "operacoes", label: "Operações" },
];


  const handleSuspectsSelection = useCallback(
    (_: readonly number[], selectedItems: Suspect[]) => {
      setSelectedSuspects(selectedItems);
    },
    []
  );

  const handleNumbersSelection = useCallback(
    (_: readonly number[], selectedItems: Numbers[]) => {
      setSelectedNumbers(selectedItems);
    },
    []
  );

  const onConfirm = () => {
    setSuspects(selectedSuspects);
    setNumbers(selectedNumbers);
    navigate("/dashboard");
  };

  return (
    <Box p={3} sx={{ fontFamily: "Inter, sans-serif" }}>
      <Box display="flex" justifyContent="space-between" alignItems="baseline">
        <Typography variant="h5" color="#000000" mb={4} fontWeight={700}>
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

      {loading ? (
        <Box display="flex" justifyContent="center" mt={6}>
          <CircularProgress color="inherit" />
        </Box>
      ) : error ? (
        <Typography color="error" fontWeight={600}>
          {error}
        </Typography>
      ) : (
        <>
          <GenericTable
            rows={suspects}
            headCells={suspectHeadCells}
            collapsible
            defaultCollapsed={false}
            title="Suspeitos"
            defaultOrderBy="apelido"
            singleSelect={false}
            onSelectionChange={handleSuspectsSelection}
            initialSelected={selectedSuspectsContext.map((s) => s.id)}
            noDataMessage="Nenhum suspeito encontrado"
            onDelete={() => { }}
          />

          <GenericTable
            rows={numbers}
            headCells={numberHeadCells}
            collapsible
            defaultCollapsed={false}
            title="Números Interceptados"
            defaultOrderBy="numero"
            singleSelect={false}
            onSelectionChange={handleNumbersSelection}
            initialSelected={selectedNumbersContext.map((n) => n.id)}
            noDataMessage="Nenhum número encontrado"
            onDelete={() => { }}
          />

          <Box sx={{ width: "100%", display: "flex", justifyContent: "end" }}>
            <Button
              disabled={selectedSuspects.length === 0 && selectedNumbers.length === 0}
              onClick={onConfirm}
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
        </>
      )}

      <CreateSuspectModal isOpen={openModal} onClose={() => setOpenModal(false)} />
    </Box>
  );
};

export default Suspects;
