import {
  Paper,
  Box,
  Collapse,
  IconButton,
  MenuItem,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useMemo, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import BarChartGeneric, {
  BarChartData,
} from "../../components/dashboard/WebChart/BarChart";
import { FilterType } from "../../enum/ViewSelectionFilterEnum";
import ViewSelectionFilter from "../../components/filters/ViewSelection";
import MultiSelect from "../../components/multiSelect";
import { AppContext } from "../../context/AppContext";
import { useContactMessages } from "../../hooks/useContactMessages";
import { useNavigate } from "react-router-dom";
import { MessageFilterGroup, MessageFilterType } from "../../interface/dashboard/chartInterface";
import { usePeriodMessages } from "../../hooks/usePeriodMessages";

const menuItemStyles = {
  padding: "4px 16px",
  "&:hover": {
    backgroundColor: "transparent !important",
    color: "inherit !important",
  },
  "&.Mui-selected": {
    backgroundColor: "hsla(44, 45.60%, 42.50%, 0.08) !important",
    color: "inherit !important",
  },
  "&.Mui-selected:hover": {
    backgroundColor: "hsla(44, 45.60%, 42.50%, 0.08) !important",
    color: "inherit !important",
  },
  "&.Mui-selected, &.Mui-selected:focus, &.Mui-selected:active": {
    backgroundColor: "hsla(44, 45.60%, 42.50%, 0.08) !important",
    color: "inherit !important",
  },
};

const focusedTextFieldStyles = {
  minWidth: "11rem",
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "customButton.lightGray",
  },
  "& label.Mui-focused": {
    color: "inherit",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "customButton.lightGray",
    borderWidth: "1px",
  },

  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "customButton.lightGray",
    },
    "&.Mui-focused fieldset": {
      borderColor: "customButton.lightGray",
    },
    "& input": {
      outline: "none",
    },
  },
};

const graficFilters = [
  { value: FilterType.ALL, label: "Todos" },
  { value: FilterType.INTERACTIONS, label: "Interações" },
  { value: FilterType.IP, label: "IPs" },
  { value: FilterType.TIME, label: "Horário" },
  { value: FilterType.DATA, label: "Data" },
];

const mensagensPorIP: BarChartData[] = [
  { key: "IP 1", value: 55 },
  { key: "IP 2", value: 22 },
  { key: "IP 3", value: 40 },
  { key: "IP 4", value: 17 },
  { key: "IP 5", value: 50 },
  { key: "IP 6", value: 2 },
  { key: "IP 7", value: 15 },
];

const mensagensPorDia: BarChartData[] = [
  { key: "Segunda", value: 50 },
  { key: "Terça", value: 10 },
  { key: "Quarta", value: 12 },
  { key: "Quinta", value: 38 },
  { key: "Sexta", value: 58 },
  { key: "Sábado", value: 40 },
  { key: "Domingo", value: 30 },
];

const options = [
  "Jorge",
  "Marcinho",
  "Rogerinho",
  "51 91234-5678",
  "51 91234-5679",
  "51 91234-5680",
];

interface ChartConfig {
  type: FilterType;
  data: BarChartData[];
  title: string;
  subtitle: string;
  tooltipLabel: string;
}

const Dashboard: React.FC = () => {
  const {
    dashboardFilters: filters,
    setDashboardFilters: setFilters,
    operations,
    numbers,
    suspects
  } = useContext(AppContext);

  const [expanded, setExpanded] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!operations[0] && !numbers[0] && !suspects[0]) {
      navigate("/operacoes");
    }
  }, [operations, numbers, suspects, navigate])

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const {
    contactMessages,
    isLoading: loadingContact,
    error: errorContact,
  } = useContactMessages();

  const {
    periodMessages,
    isLoading: loadingPeriod,
    error: errorPeriod,
  } = usePeriodMessages();


  const chartConfigs = useMemo(() => [
    {
      type: FilterType.INTERACTIONS,
      data: contactMessages,
      title: "Mensagens por Contato",
      subtitle: "Número de",
      tooltipLabel: "Contato",
    },
    {
      type: FilterType.IP,
      data: mensagensPorIP,
      title: "Mensagens por IP",
      subtitle: "Número de",
      tooltipLabel: "IP",
    },
    {
      type: FilterType.TIME,
      data: periodMessages,
      title: "Mensagens por Horário",
      subtitle: "Número de",
      tooltipLabel: "Período",
    },
    {
      type: FilterType.DATA,
      data: mensagensPorDia,
      title: "Mensagens por Dia",
      subtitle: "Número de",
      tooltipLabel: "Dias",
    },
  ], [contactMessages, periodMessages]);

  const chartArea = useMemo(() => {
    const renderChart = (cfg: ChartConfig) => {
      const isLoading =
        (cfg.type === FilterType.INTERACTIONS && loadingContact) ||
        (cfg.type === FilterType.TIME && loadingPeriod);

      const hasError =
        (cfg.type === FilterType.INTERACTIONS && errorContact) ||
        (cfg.type === FilterType.TIME && errorPeriod);

      const isEmpty = cfg.data.length === 0;

      return (
        <Box
          key={cfg.type}
          sx={{ cursor: "pointer" }}
          width={filters.chart !== FilterType.ALL ? "100%" : "48%"}
          onClick={() => setFilters({ ...filters, chart: cfg.type })}
        >
          {isLoading ? (
            <Box
              sx={{
                height: "100%",
                padding: 2,
                display: "flex",
                alignItems: "flex-end",
                gap: 1,
                backgroundColor: "#fff",
                borderRadius: "12px",
              }}
            >
              {[...Array(12)].map((_, idx) => (
                <Skeleton
                  key={idx}
                  variant="rectangular"
                  animation="wave"
                  width={"100%"}
                  height={Math.floor(Math.random() * 200) + 40}
                  sx={{ borderRadius: 1 }}
                />
              ))}
            </Box>
          ) : hasError ? (
            <Paper
              elevation={1}
              sx={{
                padding: "2rem",
                height: "100%",
                backgroundColor: "#fff",
                borderRadius: "12px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
                minHeight: 280,
              }}
            >
              <ErrorOutlineIcon sx={{ fontSize: 48, color: "error.main" }} />
              <Typography variant="h6" color="error.main">
                Erro ao carregar o gráfico
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {cfg.title}
              </Typography>
            </Paper>
          ) : isEmpty ? (
            <Paper
              elevation={1}
              sx={{
                padding: "2rem",
                height: "100%",
                backgroundColor: "#fff",
                borderRadius: "12px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
                minHeight: 280,
              }}
            >
              <Typography variant="h6" color="text.primary">
                Nenhum dado encontrado
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {cfg.title}
              </Typography>
            </Paper>
          ) : (
            <BarChartGeneric
              data={cfg.data}
              title={cfg.title}
              subtitle={cfg.subtitle}
              tooltipLabel={cfg.tooltipLabel}
              expanded={filters.chart === cfg.type}
            />
          )}
        </Box>
      );
    };

    if (filters.chart === FilterType.ALL) {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            width: "100%",
            gap: "1rem",
          }}
        >
          {chartConfigs.map(renderChart)}
        </Box>
      );
    }

    const cfg = chartConfigs.find((c) => c.type === filters.chart);
    return cfg ? renderChart(cfg) : null;
  }, [
    filters.chart,
    chartConfigs,
    loadingContact,
    loadingPeriod,
    errorContact,
    errorPeriod,
    setFilters,
  ]);


  return (
    <Box
      bgcolor={"#F8F8F8"}
      width={"100%"}
      minHeight="100vh"
      display={"flex"}
      flexDirection={"column"}
      alignItems={"stretch"}
      justifyContent={"flex-start"}
      overflow={"auto"}
      padding={"1rem 0rem 0rem 0rem"}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        borderBottom={expanded ? "1px solid #e0e0e0" : "none"}
      >
        <Collapse in={expanded} timeout="auto">
          <Box
            sx={{
              width: "fit-content",
              minWidth: "27rem",
              px: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <Typography
              fontFamily={"Inter, sans-serif"}
              fontWeight={600}
              fontSize={"1.25rem"}
            >
              Seleção de Alvos
            </Typography>
            <MultiSelect
              style="gray"
              placeholder="Selecione os nomes"
              height="53px"
              options={options.map((option) => ({
                id: option,
                label: option,
              }))}
              selectedOptions={filters.options}
              onChange={(opts) => setFilters({ ...filters, options: opts })}
            />
          </Box>

          <Box
            width={"100%"}
            display={"flex"}
            px={"1rem"}
            py={"0.7rem"}
            flexDirection={"row"}
            justifyContent={"left"}
            gap={"2.5rem"}
            flexWrap={"wrap"}
            flexGrow={1}
            sx={{ alignItems: "center" }}
          >
            <Box
              sx={{
                height: "fit-content",
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "0.5rem",
              }}
            >
              <Typography
                fontFamily={"Inter, sans-serif"}
                fontWeight={600}
                fontSize={"1.25rem"}
              >
                Seleção de Gráficos
              </Typography>
              <ViewSelectionFilter
                filters={graficFilters}
                selectedFilter={filters.chart?.toString() || ""}
                onChange={(val) => setFilters({ ...filters, chart: val })}
              />
            </Box>
          </Box>

          <Box
            width={"100%"}
            display={"flex"}
            px={"1rem"}
            py={"0.7rem"}
            gap={"0.5rem"}
            flexDirection={"column"}
          >
            <Typography
              variant="caption"
              fontFamily={"Inter, sans-serif"}
              fontWeight={500}
              fontSize={"14px"}
            >
              Filtrar por:
            </Typography>
            <Box
              display={"flex"}
              flexDirection={"row"}
              gap={"2rem"}
              flexWrap={"wrap"}
            >
              <TextField
                select
                variant="outlined"
                label="Grupo"
                value={filters.group}
                onChange={(e) =>
                  setFilters({ ...filters, group: e.target.value as MessageFilterGroup })
                }
                sx={{
                  ...focusedTextFieldStyles,
                }}
              >
                {Object.values(MessageFilterGroup).map((type) => (
                  <MenuItem key={type} value={type} sx={menuItemStyles}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                label="Tipo"
                value={filters.type}
                onChange={(e) =>
                  setFilters({ ...filters, type: e.target.value as MessageFilterType })
                }
                sx={focusedTextFieldStyles}
              >
                {Object.values(MessageFilterType).map((type) => (
                  <MenuItem key={type} value={type} sx={menuItemStyles}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                id="date-initial"
                InputLabelProps={{ shrink: true }}
                label="Data Inicial"
                type="date"
                value={filters.dateInitial}
                onChange={(e) => setFilters({ ...filters, dateInitial: e.target.value })}
                sx={focusedTextFieldStyles}
              />

              <TextField
                id="date-final"
                InputLabelProps={{ shrink: true }}
                label="Data Final"
                type="date"
                value={filters.dateFinal}
                onChange={(e) => setFilters({ ...filters, dateFinal: e.target.value })}
                sx={focusedTextFieldStyles}
              />

              <TextField
                id="initial-time"
                InputLabelProps={{ shrink: true }}
                label="Faixa Horária - Início"
                type="time"
                value={filters.timeInitial}
                onChange={(e) => setFilters({ ...filters, timeInitial: e.target.value })}
                sx={focusedTextFieldStyles}
              />

              <TextField
                id="final-time"
                InputLabelProps={{ shrink: true }}
                label="Faixa Horária - Fim"
                type="time"
                value={filters.timeFinal}
                onChange={(e) => setFilters({ ...filters, timeFinal: e.target.value })}
                sx={focusedTextFieldStyles}
              />
            </Box>
          </Box>
        </Collapse>
        <IconButton onClick={toggleExpanded} size="small" disableRipple>
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      <Box
        bgcolor={"#f2f2f2"}
        sx={{ width: "100%", padding: "2rem", flexGrow: "1" }}
      >
        {chartArea}
      </Box>
    </Box>
  );
};

export default Dashboard;