import { Box, Button, Typography, CircularProgress } from "@mui/material";
import React, { useCallback, useContext, useMemo, useState } from "react";
import GenericTable from "../../components/Table/Table";
import { useNavigate } from "react-router-dom";
import { useHeaderInput } from "../../hooks/useHeaderInput";
import { HeadCell } from "../../interface/table/tableInterface";
import { useSuspects, Suspect, Numbers } from "../../hooks/useSuspects";
import CreateSuspectModal from "../../components/modal/createSuspectModal";
import { AppContext } from "../../context/AppContext";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

const Suspects: React.FC = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const { headerInputValue } = useHeaderInput();
  const {
    suspects: selectedSuspectsContext,
    numbers: selectedNumbersContext,
    setSuspects,
    setNumbers,
    operations,
  } = useContext(AppContext);

  const [selectedSuspects, setSelectedSuspects] = useState<Suspect[]>(
    selectedSuspectsContext
  );
  const [selectedNumbers, setSelectedNumbers] = useState<Numbers[]>(
    selectedNumbersContext
  );

  const operationIds = useMemo(
    () => operations.map((op) => op.id),
    [operations]
  );

  const { suspects, numbers, loading, error } = useSuspects({
    searchTerm: headerInputValue,
    operationIds,
  });

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [suspectToDelete, setSuspectToDelete] = useState<Suspect | null>(null);
  const [openBatchDeleteDialog, setOpenBatchDeleteDialog] = useState(false);

  const handleDeleteSuspect = (id: number) => {
    const updated = suspects.filter((s) => s.id !== id);
    setSuspects(updated);
    setOpenDeleteDialog(false);
    setSuspectToDelete(null);
  };

  // Exclusão em lote
  const handleBatchDelete = () => {
    const selectedIds = selectedSuspects.map((s) => s.id);
    const updated = suspects.filter((s) => !selectedIds.includes(s.id));
    setSuspects(updated);
    setOpenBatchDeleteDialog(false);
  };

  // Função para deletar um suspeito individualmente (pronto para integração com backend)
  const deleteSuspect = async (id: number) => {
    // TODO: Chamar API para deletar suspeito por id
    // await api.delete(`/suspects/${id}`);
    const updated = suspects.filter((s) => s.id !== id);
    setSuspects(updated);
  };

  // Função para deletar todos os suspeitos (pronto para integração com backend)
  const deleteAllSuspects = async (ids: number[]) => {
    // TODO: Chamar API para deletar vários suspeitos
    // await api.post('/suspects/delete-multiple', { ids });
    const updated = suspects.filter((s) => !ids.includes(s.id));
    setSuspects(updated);
  };

  // Handler para o dialog de exclusão em lote
  const handleDeleteAll = async () => {
    const allIds = suspects.map((s) => s.id);
    await deleteAllSuspects(allIds);
  };

  // Handler para o dialog de exclusão individual
  const handleDeleteSuspectDialog = async () => {
    if (suspectToDelete) {
      await deleteSuspect(suspectToDelete.id);
      setOpenDeleteDialog(false);
      setSuspectToDelete(null);
    }
  };

  // Adiciona coluna de deletar individual na tabela
  const suspectHeadCells: readonly HeadCell<Suspect>[] = [
    { id: "apelido", label: "Nome/Apelido" },
    { id: "numeros", label: "Número" },
    { id: "data_criacao", label: "Data de inserção" },
    { id: "relevante", label: "Relevância" },
    { id: "operacoes", label: "Operações" },
    {
      id: "delete",
      label: "",
      iconAction: {
        icon: (
          <IconButton color="default" size="small">
            <DeleteIcon sx={{ color: 'gray' }} />
          </IconButton>
        ),
        onClick: (id: number) => {
          const suspect = suspects.find((s) => s.id === id) || null;
          setSuspectToDelete(suspect);
          setOpenDeleteDialog(true);
        },
      },
    },
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

  // Remover qualquer opção de exclusão da tabela de números
  const numberHeadCells: readonly HeadCell<Numbers>[] = [
    { id: "numero", label: "Número" },
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

  // MOCK: Lista de suspeitos para visualização
  const mockSuspects: Suspect[] = [
    {
      id: 1,
      apelido: "Joãozinho",
      numeros: "(51) 99999-1111",
      data_criacao: "2024-06-01",
      relevante: "Alta",
      operacoes: "Operação A"
    },
    {
      id: 2,
      apelido: "Maria",
      numeros: "(51) 98888-2222",
      data_criacao: "2024-06-02",
      relevante: "Média",
      operacoes: "Operação B"
    },
    {
      id: 3,
      apelido: "Carlos",
      numeros: "(51) 97777-3333",
      data_criacao: "2024-06-03",
      relevante: "Baixa",
      operacoes: "Operação C"
    }
  ];

  // Use os dados mockados se a lista de suspects estiver vazia
  const suspectsToShow = suspects.length > 0 ? suspects : mockSuspects;

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
      ) : (
        <>
          <GenericTable
            rows={mockSuspects}
            headCells={suspectHeadCells}
            collapsible
            defaultCollapsed={false}
            title="Suspeitos"
            defaultOrderBy="apelido"
            singleSelect={false}
            onSelectionChange={handleSuspectsSelection}
            initialSelected={selectedSuspectsContext.map((s) => s.id)}
            noDataMessage="Nenhum suspeito encontrado"
            onDelete={handleDeleteAll}
            allowDelete={true}
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
          />

          <Box sx={{ width: "100%", display: "flex", justifyContent: "end" }}>
            <Button
              disabled={
                selectedSuspects.length === 0 && selectedNumbers.length === 0
              }
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

      <CreateSuspectModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />

      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirmar exclusão</DialogTitle>
        <DialogContent>
          <Typography>
            Deseja realmente excluir o suspeito <b>{suspectToDelete?.apelido || suspectToDelete?.name}</b>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="inherit">
            Cancelar
          </Button>
          <Button
            onClick={handleDeleteSuspectDialog}
            color="error"
            variant="contained"
          >
            Excluir
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openBatchDeleteDialog} onClose={() => setOpenBatchDeleteDialog(false)}>
        <DialogTitle>Confirmar exclusão em lote</DialogTitle>
        <DialogContent>
          <Typography>
            Deseja realmente excluir todos os suspeitos selecionados?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenBatchDeleteDialog(false)} color="inherit">
            Cancelar
          </Button>
          <Button
            onClick={handleBatchDelete}
            color="error"
            variant="contained"
          >
            Excluir todos
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Suspects;
