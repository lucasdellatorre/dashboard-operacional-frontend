import { Box, Button, Typography, CircularProgress } from "@mui/material";
import React, { useCallback, useContext, useMemo, useState } from "react";
import GenericTable from "../../components/Table/Table";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useHeaderInput } from "../../hooks/useHeaderInput";
import { HeadCell } from "../../interface/table/tableInterface";
import { Targets, useSuspects } from "../../hooks/useSuspects";
import CreateSuspectModal from "../../components/modal/createSuspectModal";
import { AppContext } from "../../context/AppContext";

const Suspects: React.FC = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [searchParams] = useSearchParams();
  const { headerInputValue } = useHeaderInput();
  const { targets, setTargets } = useContext(AppContext);

  const operationIdParam = searchParams.get("operacao");
  const operationIds = useMemo(
    () => operationIdParam?.split(",").map(Number).filter(Boolean) ?? [],
    [operationIdParam]
  );

  const { suspectTargets, numberTargets, loading, error } = useSuspects({
    searchTerm: headerInputValue,
    operationIds,
  });

  const suspectHeadCells: readonly HeadCell<Targets>[] = [
    { id: "suspectName", label: "Nome/Apelido" },
    { id: "number", label: "Número" },
    { id: "date", label: "Data de inserção" },
    { id: "relevance", label: "Relevância" },
    { id: "operationName", label: "Operações" },
    {
      id: "botton",
      label: "",
      iconAction: {
        icon: (
          <Button
            variant="contained"
            size="small"
            sx={{
              bgcolor: "customButton.black",
              color: "customText.white",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.8rem",
            }}
          >
            Detalhes
          </Button>
        ),
        onClick: (id: number) => {
          navigate(`/dashboard/detalhesSuspeito/${id}`);
        },
      },
    },
  ];

  const numberHeadCells: readonly HeadCell<Targets>[] = [
    { id: "number", label: "Número" },
    { id: "operationName", label: "Operações" },
  ];

  const handleSelectionChange = useCallback(
    (_: readonly number[], selectedItems: Targets[]) => {
      setTargets(selectedItems);
    },
    [setTargets]
  );

  const operationsSelected = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    const targetIds = targets.map((item) => item.id).join("-");
    newSearchParams.set("operacao", operationIdParam ?? "");
    newSearchParams.set("alvo", targetIds);
    navigate(`/dashboard?${newSearchParams.toString()}`);
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
            rows={suspectTargets}
            headCells={suspectHeadCells}
            collapsible
            title="Suspeitos"
            defaultOrderBy="suspectName"
            singleSelect={false}
            onSelectionChange={handleSelectionChange}
            initialSelected={targets.map((t) => t.id)}
            noDataMessage="Nenhum suspeito encontrado"
            onDelete={() => {}}
          />

          <GenericTable
            rows={numberTargets}
            headCells={numberHeadCells}
            collapsible
            title="Números Interceptados"
            defaultOrderBy="number"
            singleSelect={false}
            onSelectionChange={handleSelectionChange}
            initialSelected={targets.map((t) => t.id)}
            noDataMessage="Nenhum número encontrado"
            onDelete={() => {}}
          />

          <Box sx={{ width: "100%", display: "flex", justifyContent: "end" }}>
            <Button
              disabled={targets.length === 0}
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
        </>
      )}

      <CreateSuspectModal isOpen={openModal} onClose={() => setOpenModal(false)} />
    </Box>
  );
};

export default Suspects;
