import Typography from "@mui/material/Typography";
import Box from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Collapse from "@mui/material/Collapse";
import GenericTable from "../../components/Table/Table";
import { GenericData, HeadCell } from "../../interface/table/tableInterface";
import EmailModal from "../../components/modal/createEmailModal";
import EditableField from "../../components/editableField";
import { useEffect, useState } from "react";
import { isValidCPF } from "../../utils/validationUtils";
import EditableMultilineField from "../../components/editableMultilineField";
import { useSuspectInfo } from "../../hooks/useSuspectInfo";
import TelephoneModal from "../../components/modal/createTelephoneModal";
import { updateSuspectDetails } from "../../controllers/suspectController";

interface Email extends GenericData {
  email: string;
  insertDate: string;
  insertBy: string;
}
interface Phone extends GenericData {
  phone: string;
  insertDate: string;
  insertBy: string;
}
interface Ips extends GenericData {
  ip: string;
  ocorrencias: number;
}

const formatCPF = (value: string): string => {
  const numericValue = value.replace(/\D/g, "").slice(0, 11);
  return numericValue
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};

const SuspectsDetails = () => {
  const { suspect, loading, error } = useSuspectInfo(
    Number(window.location.pathname.split("/").pop())
  );

  // Estado para controlar o loading individual de cada campo
  const [loadingFields, setLoadingFields] = useState({
    nickname: false,
    name: false,
    cpf: false,
    notes: false,
    relevante: false,
  });
  
  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [cpfError, setCpfError] = useState("");
  const [notes, setNotes] = useState("");
  const [relevante, setRelevante] = useState<boolean>(false);
  const [isModified, setIsModified] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "info" as "error" | "warning" | "info" | "success",
  });
  
  useEffect(() => {
    if (alert.show) {
      const timer = setTimeout(() => {
        setAlert({ ...alert, show: false });
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  useEffect(() => {
    if (suspect) {
      setNickname(suspect.apelido);
      setName(suspect.nome);
      setCpf(formatCPF(suspect.cpf));
      setNotes(suspect.anotacoes);
      setRelevante(suspect.relevante);
    }
  }, [suspect]);

  async function updateField(field: string, value: string | boolean) {
    setLoadingFields(prev => ({ ...prev, [field]: true }));
  
    const fieldMapping: Record<string, string> = {
      nickname: 'apelido',
      name: 'nome',
      cpf: 'cpf',
      notes: 'anotacoes',
      relevante: 'relevante'
    };
    
    const values = {
      [fieldMapping[field]]: value || null
    };
    
    const { isSuccess, errorMessage } = await updateSuspectDetails(
      suspect?.id.toString() || "",
      values
    );
  
    setLoadingFields(prev => ({ ...prev, [field]: false }));
    
    if (isSuccess) {
      setAlert({
        show: true,
        type: "success",
        message: "Campo atualizado com sucesso!",
      });
    } else {
    
      setAlert({
        show: true,
        type: "error",
        message: errorMessage || "Erro ao atualizar o campo.",
      });
    }
  }

  const handleNicknameChange = (newValue: string) => {
    setNickname(newValue);
    setIsModified(true);
  };

  const handleNameChange = (newValue: string) => {
    setName(newValue);
    setIsModified(true);
  };

  const handleCpfChange = (newValue: string) => {
    const formatted = formatCPF(newValue);
    setCpf(formatted);
    setCpfError(isValidCPF(formatted) ? "" : "CPF inválido");
    setIsModified(true);
  };

  const handleNotesChange = (newValue: string) => {
    setNotes(newValue);
    setIsModified(true);
  };

  const handleRelevanteChange = (value: string) => {
    const newValue = value === "sim";
    setRelevante(newValue);
    setIsModified(true);
    updateField("relevante", newValue);
  };

  const EmailHeaderCells: readonly HeadCell<Email>[] = [
    { id: "email", label: "Email" },
    { id: "insertDate", label: "Data de Inserção" },
    { id: "insertBy", label: "Inserido por" },
    {
      id: "edit",
      label: "",
      iconAction: {
        icon: <EditIcon sx={{ fontSize: "1.2rem" }} />,
        onClick: () => console.log("editar"),
      },
    },
  ];

  const PhoneHeaderCells: readonly HeadCell<Phone>[] = [
    { id: "phone", label: "Celular" },
    { id: "insertDate", label: "Data de Inserção" },
    { id: "insertBy", label: "Inserido por" },
  ];

  const IPsHeaderCells: readonly HeadCell<Ips>[] = [
    { id: "ip", label: "IP" },
    { id: "ocorrencias", label: "Ocorrências" },
  ];
  const [openTelephoneModal, setOpenTelephoneModal] = useState(false);
  const [openEmailModal, setOpenEmailModal] = useState(false);

  function criarEditarTelephone() {
    //TODO: create or edit email integrated with backend
    setOpenEmailModal(false);
  }
  function criarEditarEmail() {
    //TODO: create or edit email integrated with backend
    setOpenEmailModal(false);
  }

  return (
    <>
      <TelephoneModal
        isOpen={openTelephoneModal}
        onClose={() => setOpenTelephoneModal(false)}
        onSubmit={criarEditarTelephone}
      />
      <EmailModal
        isOpen={openEmailModal}
        onClose={() => setOpenEmailModal(false)}
        onSubmit={criarEditarEmail}
      />
      <Collapse in={alert.show} sx={{ bgcolor: "customBackground.secondary" }}>
        <Alert
          severity={alert.type}
          onClose={() => setAlert({ ...alert, show: false })}
          sx={{
            mb: 2,
            borderRadius: 2,
            boxShadow: 3,
            fontWeight: 500,
            backgroundColor: (theme) =>
              alert.type === "success"
                ? alpha(theme.palette.success.light, 0.2)
                : alert.type === "error"
                ? alpha(theme.palette.error.light, 0.2)
                : alpha(theme.palette.info.light, 0.2),
            color: (theme) =>
              alert.type === "success"
                ? theme.palette.success.dark
                : alert.type === "error"
                ? theme.palette.error.dark
                : theme.palette.info.dark,
          }}
        >
          {alert.message}
        </Alert>
      </Collapse>
      <Box
        bgcolor="customBackground.secondary"
        sx={{
          pt: "clamp(1rem, 3vh, 3rem)",
          pb: "clamp(1rem, 2vh, 3rem)",
          px: "clamp(1rem, 3.5vw, 4rem)",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              mb: 1,
              fontSize: "1.125rem",
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => window.history.back()}
          >
            <ArrowBackIosIcon sx={{ fontSize: "1.125rem" }} />
            Voltar
          </Typography>

        </Box>

        <Typography
          variant="h5"
          color="#000000"
          fontWeight={700}
          sx={{ fontFamily: "Inter, sans-serif" }}
        >
          Informações do Suspeito
        </Typography>

        {error && (
          <Typography color="error" fontWeight={600}>
            {error}
          </Typography>
        )}

{!error && (
          <>
            <Box display="flex" flexDirection="row" gap={10} flexWrap="wrap">
              <Box
                display="flex"
                flexDirection="column"
                maxWidth="30rem"
                width="25rem"
              >
                {loading ? (
                  <>
                    <Skeleton height={50} />
                    <Skeleton height={50} />
                    <Skeleton height={50} />
                  </>
                ) : (
                  <>
                    <EditableField
                      label="Apelido"
                      value={nickname}
                      onChange={handleNicknameChange}
                      onConfirm={() => updateField("nickname", nickname)}
                      loading={loadingFields.nickname}
                    />
                    <EditableField
                      label="Nome"
                      value={name}
                      onChange={handleNameChange}
                      onConfirm={() => updateField("name", name)}
                      loading={loadingFields.name}
                    />
                    <EditableField
                      label="CPF"
                      value={cpf}
                      onChange={handleCpfChange}
                      onConfirm={() => !cpfError && updateField("cpf", cpf)}
                      loading={loadingFields.cpf}
                      disabled={!!cpfError}
                    />
                    {cpfError && (
                      <Typography fontSize="0.875rem" color="error">
                        {cpfError}
                      </Typography>
                    )}
                  </>
                )}
              </Box>
              {loading ? (
                <Skeleton height={160} width="100%" />
              ) : (
                <EditableMultilineField
                  label="Anotações"
                  value={notes}
                  onChange={handleNotesChange}
                  onConfirm={() => updateField("notes", notes)}
                  loading={loadingFields.notes}
                />
              )}
            </Box>

            {loading ? (
              <Skeleton height={50} width={250} />
            ) : (
              <FormControl
                fullWidth
                size="small"
                sx={{
                  bgcolor: "white",
                  borderRadius: "0.313rem",
                  maxWidth: "25rem",
                }}
              >
                <InputLabel
                  id="relevante-label"
                  sx={{
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    color: "text.primary",
                    "&.Mui-focused": {
                      color: "text.primary", // evita ficar azul no foco
                    },
                  }}
                >
                  Relevante
                </InputLabel>
                <Select
                  labelId="relevante-label"
                  value={relevante ? "sim" : "nao"}
                  label="Relevante"
                  onChange={(e) => handleRelevanteChange(e.target.value)}
                  sx={{
                    fontWeight: 500,
                    color: "text.primary",

                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "customButton.gold",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "customButton.gold",
                    },
                  }}
                >
                  <MenuItem
                    value="sim"
                    sx={{
                      "&.Mui-selected": {
                        backgroundColor: (theme) =>
                          alpha(theme.palette.customButton.gold, 0.4),
                        color: "black",
                      },
                      "&.Mui-selected:hover": {
                        backgroundColor: (theme) =>
                          alpha(theme.palette.customButton.gold, 0.5),
                      },
                    }}
                  >
                    Sim
                  </MenuItem>

                  <MenuItem
                    value="nao"
                    sx={{
                      "&.Mui-selected": {
                        backgroundColor: (theme) =>
                          alpha(theme.palette.customButton.gold, 0.4),
                        color: "black",
                      },
                      "&.Mui-selected:hover": {
                        backgroundColor: (theme) =>
                          alpha(theme.palette.customButton.gold, 0.5),
                      },
                    }}
                  >
                    Não
                  </MenuItem>
                </Select>
              </FormControl>
            )}
            {!loading && (
              <p style={{ fontSize: "0.775rem", color: "#666" }}>
                *Para editar os inputs, clique no botão de lapis e após terminar
                de editar clique novamente no lapis para desabilitar a edição
              </p>
            )}

            {!loading && suspect && (
              <Box display="flex" flexDirection="column" gap="0rem">
                <GenericTable
                  rows={(suspect.ips || []).map((ip, idx) => ({
                    id: idx,
                    ip: ip.ip,
                    ocorrencias: ip.ocorrencias,
                  }))}
                  collapsible
                  addButton={false}
                  onAdd={() => {}}
                  singleSelect
                  headCells={IPsHeaderCells}
                  title="IPs"
                  defaultOrderBy="ocorrencias"
                  onSelectionChange={() => {}}
                  initialSelected={[]}
                  noDataMessage="Nenhum IP encontrado para este suspeito"
                  onDelete={() => {}}
                  allowSelection={false}
                  headerCollor="white"
                />

                <GenericTable
                  rows={(suspect.celulares || []).map((c, idx) => ({
                    id: idx,
                    phone: c.numero,
                    insertDate: c.lastUpdateDate,
                    insertBy: c.lastUpdateCpf,
                  }))}
                  collapsible
                  addButton
                  onAdd={() => {
                    setOpenTelephoneModal(true);
                  }}
                  singleSelect
                  headCells={PhoneHeaderCells}
                  title="Celulares"
                  defaultOrderBy="insertDate"
                  onSelectionChange={() => {}}
                  initialSelected={[]}
                  noDataMessage="Nenhum celular encontrado para este suspeito"
                  onDelete={() => {}}
                  headerCollor="white"
                />

                <GenericTable
                  rows={(suspect.emails || []).map((e, idx) => ({
                    id: idx,
                    email: e.email,
                    insertDate: e.lastUpdateDate,
                    insertBy: e.lastUpdateCpf,
                  }))}
                  collapsible
                  addButton
                  onAdd={() => {
                    setOpenEmailModal(true);
                  }}
                  singleSelect
                  headCells={EmailHeaderCells}
                  title="Emails"
                  defaultOrderBy="insertDate"
                  onSelectionChange={() => {}}
                  initialSelected={[]}
                  noDataMessage="Nenhum email encontrado para este suspeito"
                  onDelete={() => {}}
                  headerCollor="white"
                />
              </Box>
            )}
          </>
        )}
      </Box>
    </>
  );
};

export default SuspectsDetails;
