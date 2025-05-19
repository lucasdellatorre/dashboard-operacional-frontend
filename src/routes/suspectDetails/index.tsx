import Typography from "@mui/material/Typography";
import Box from "@mui/material/Typography";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import GenericTable from "../../components/Table/Table";
import { GenericData, HeadCell } from "../../interface/table/tableInterface";
import EditableField from "../../components/editableField";
import { useEffect, useState } from "react";
import { isValidCPF } from "../../utils/validationUtils";
import EditableMultilineField from "../../components/editableMultilineField";
import { useSuspectInfo } from "../../hooks/useSuspectInfo";

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
  const { suspect, loading, error } = useSuspectInfo(1001);

  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [cpfError, setCpfError] = useState("");
  const [notes, setNotes] = useState("");
  const [relevante, setRelevante] = useState<boolean>(false);

  useEffect(() => {
    if (suspect) {
      setNickname(suspect.apelido);
      setName(suspect.nome);
      setCpf(formatCPF(suspect.cpf));
      setNotes(suspect.anotacoes);
      setRelevante(suspect.relevante);
    }
  }, [suspect]);

  const handleCpfChange = (newValue: string) => {
    const formatted = formatCPF(newValue);
    setCpf(formatted);
    setCpfError(isValidCPF(formatted) ? "" : "CPF inválido");
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

  return (
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
      <Typography
        sx={{
          mb: 1,
          fontSize: "1.125rem",
          fontFamily: "Inter, sans-serif",
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={() => window.history.back()}
      >
        <ArrowBackIosIcon sx={{ fontSize: "1.125rem" }} />
        Voltar
      </Typography>

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
            <Box display="flex" flexDirection="column" maxWidth="30rem" width="25rem">
              {loading ? (
                <>
                  <Skeleton height={50} />
                  <Skeleton height={50} />
                  <Skeleton height={50} />
                </>
              ) : (
                <>
                  <EditableField label="Apelido" value={nickname} onChange={setNickname} />
                  <EditableField label="Nome" value={name} onChange={setName} />
                  <EditableField label="CPF" value={cpf} onChange={handleCpfChange} />
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
                onChange={setNotes}
              />
            )}
          </Box>

          {loading ? (
            <Skeleton height={50} width={250} />
          ) : (
            <FormControl fullWidth size="small" sx={{ bgcolor: "white", borderRadius: "0.313rem", maxWidth: "25rem" }}>
              <InputLabel id="relevante-label" sx={{ fontWeight: 600, fontSize: "0.875rem", color: "text.primary" }}>
                Relevante
              </InputLabel>
              <Select
                labelId="relevante-label"
                value={relevante ? "sim" : "nao"}
                label="Relevante"
                onChange={(e) => setRelevante(e.target.value === "sim")}
                sx={{ fontWeight: 500, color: "text.primary", "& .MuiSelect-icon": { color: "customButton.gold" } }}
              >
                <MenuItem value="sim">Sim</MenuItem>
                <MenuItem value="nao">Não</MenuItem>
              </Select>
            </FormControl>
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
                onAdd={() => {}}
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
                onAdd={() => {}}
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
  );
};

export default SuspectsDetails;
