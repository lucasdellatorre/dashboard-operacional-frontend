import { Box, MenuItem, TextField, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import BarChartGeneric, {
  BarChartData,
} from "../../components/dashboard/WebChart/BarChart";
import { FilterType } from "../../enum/ViewSelectionFilterEnum";
import ViewSelectionFilter from "../../components/filters/ViewSelection";
import MultiSelect from "../../components/multiSelect";

const styles = {
  menuItem: {
    padding: "4px 16px",
    "&:hover": {
      backgroundColor: "rgba(158, 131, 59, 0.08)",
    },
    "&.Mui-selected": {
      backgroundColor: "rgb(233, 233, 233)",
    },
    "&.Mui-selected:hover": {
      backgroundColor: "hsla(44, 45.60%, 42.50%, 0.08)",
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
const selectionTypeFilter = [
  { value: FilterType.UNION, label: "União" },
  { value: FilterType.INCOMMON, label: "Em Comum" },
  { value: FilterType.BETWEENTARGETS, label: "Entre Alvos" },
];

//Dados Mockados

const mensagensPorContato: BarChartData[] = [
  { key: "9123456789", value: 50 },
  { key: "9123456788", value: 37 },
  { key: "9123456787", value: 40 },
  { key: "9123456786", value: 425 },
  { key: "9123456785", value: 80 },
  { key: "9123456784", value: 385 },
  { key: "9123456783", value: 90 },
  { key: "9123456782", value: 275 },
  { key: "9123456781", value: 490 },
  { key: "9123456780", value: 310 },
  { key: "9123456799", value: 245 },
  { key: "9123456798", value: 380 },
  { key: "9123456797", value: 295 },
  { key: "9123456796", value: 410 },
  { key: "9123456795", value: 330 },
];

const mensagensPorHorario: BarChartData[] = [
  { key: "00-2h", value: 1200 },
  { key: "2-4h", value: 900 },
  { key: "4-6h", value: 1100 },
  { key: "6-8h", value: 8000 },
  { key: "8-10h", value: 1500 },
  { key: "10-12h", value: 7000 },
  { key: "12-14h", value: 1600 },
  { key: "14-16h", value: 5000 },
  { key: "16-18h", value: 9000 },
  { key: "18-20h", value: 6000 },
  { key: "20-22h", value: 4800 },
  { key: "22-23:59h", value: 7500 },
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

const options = ["Jorge", "Marcinho", "Rogerinho"];

interface ChartConfig {
  type: FilterType;
  data: BarChartData[];
  title: string;
  subtitle: string;
  tooltipLabel: string;
}
const chartConfigs: ChartConfig[] = [
  {
    type: FilterType.INTERACTIONS,
    data: mensagensPorContato,
    title: "Mensagens por Contato",
    subtitle: "Número de",
    tooltipLabel: "Total",
  },
  {
    type: FilterType.TIME,
    data: mensagensPorHorario,
    title: "Mensagens por Horário",
    subtitle: "Número de",
    tooltipLabel: "Total",
  },
  {
    type: FilterType.IP,
    data: mensagensPorIP,
    title: "Mensagens por IP",
    subtitle: "Número de",
    tooltipLabel: "Total",
  },
  {
    type: FilterType.DATA,
    data: mensagensPorDia,
    title: "Mensagens por Dia",
    subtitle: "Número de",
    tooltipLabel: "Dias",
  },
];

const Dashboard: React.FC = () => {
  const [selectedFilterType, setSelectedFilterType] = useState<FilterType>(
    FilterType.UNION
  );

  const [selectedChart, setSelectedChart] = useState<FilterType>(
    FilterType.ALL
  );

  const [selectedType, setSelectedType] = useState("Texto");
  const [selectedGroup, setSelectedGroup] = useState("Ambos");

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const chartArea = useMemo(() => {
    const renderChart = (cfg: ChartConfig) => (
      <Box
        key={cfg.type}
        sx={{ cursor: "pointer" }}
        width={selectedChart !== FilterType.ALL ? "%" : "48%"}
        onClick={() => setSelectedChart(cfg.type)}
      >
        <BarChartGeneric
          data={cfg.data}
          title={cfg.title}
          subtitle={cfg.subtitle}
          tooltipLabel={cfg.tooltipLabel}
          expanded={selectedChart === cfg.type}
        />
      </Box>
    );

    if (selectedChart === FilterType.ALL) {
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

    const cfg = chartConfigs.find((c) => c.type === selectedChart);
    return cfg ? renderChart(cfg) : null;
  }, [selectedChart]);

  return (
    <Box
      bgcolor={"customBackground.secondary"}
      width={"100%"}
      minHeight="100vh"
      display={"flex"}
      flexDirection={"column"}
      alignItems={"stretch"}
      justifyContent={"flex-start"}
      overflow={"auto"}
      padding={"1rem 0rem 0rem 0rem"}
    >
      <Box width={"29rem"} px={"1rem"}>
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
          options={options}
          selectedOptions={selectedOptions}
          onChange={(selected) => {
            setSelectedOptions(selected);
          }}
        />
      </Box>

      <Box
        bgcolor={"customBackground.secondary"}
        width={"100%"}
        display={"flex"}
        px={"1rem"}
        py={"0.7rem"}
        flexDirection={"row"}
        justifyContent={"left"}
        gap={"2rem"}
        flexWrap={"wrap"}
        sx={{
          // justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            height: "fit-content",
            // width: "100%",
            // maxWidth: "1200px",
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            justifyContent: "center",
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
            selectedFilter={selectedChart}
            onChange={(value) => setSelectedChart(value)}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <Typography
            fontFamily={"Inter, sans-serif"}
            fontWeight={600}
            fontSize={"1.25rem"}
          >
            Tipo de Seleção
          </Typography>

          <ViewSelectionFilter
            filters={selectionTypeFilter}
            selectedFilter={selectedFilterType}
            onChange={(value) => setSelectedFilterType(value)}
          />
        </Box>
      </Box>

      <Box height={"0.07rem"} bgcolor={"divider"} width={"100%"} />

      <Box
        bgcolor={"customBackground.secondary"}
        width={"100%"}
        display={"flex"}
        px={"1rem"}
        py={"0.7rem"}
        flexDirection={"column"}
      >
        <Typography
          variant="caption"
          fontFamily={"Inter, sans-serif"}
          fontWeight={600}
        >
          {" "}
          Filtrar por:{" "}
        </Typography>

        <Box
          display={"flex"}
          flexDirection={"row"}
          gap={"2rem"}
          flexWrap={"wrap"}
        >
          <TextField
            select
            variant="filled"
            label="Grupo"
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            sx={{
              minWidth: "11rem",
              "& label.Mui-focused": {
                color: "customButton.gold",
              },
              "& .MuiFilledInput-underline:after": {
                borderBottomColor: "customButton.gold",
              },
            }}
          >
            <MenuItem value="Grupo" sx={styles.menuItem}>
              Grupo
            </MenuItem>
            <MenuItem sx={styles.menuItem} value="Número">
              Número
            </MenuItem>
            <MenuItem sx={styles.menuItem} value="Ambos">
              Ambos
            </MenuItem>
          </TextField>

          <TextField
            select
            variant="filled"
            label="Tipo"
            defaultValue="Texto"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            sx={{
              minWidth: "11rem",
              "& label.Mui-focused": {
                color: "customButton.gold",
              },
              "& .MuiFilledInput-underline:after": {
                borderBottomColor: "customButton.gold",
              },
            }}
          >
            <MenuItem value="Texto" sx={styles.menuItem}>
              Texto
            </MenuItem>
            <MenuItem
              sx={{
                padding: "4px 16px",
                "&:hover": {
                  backgroundColor: "rgba(158, 131, 59, 0.08)",
                },
                "&.Mui-selected": {
                  backgroundColor: "transparent",
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "hsla(44, 45.60%, 42.50%, 0.08)",
                },
              }}
              value="Vídeo"
            >
              Vídeo
            </MenuItem>
            <MenuItem sx={styles.menuItem} value="Todos">
              Todos
            </MenuItem>
          </TextField>

          <TextField
            select
            variant="filled"
            label="Simetria"
            sx={{
              minWidth: "11rem",
              "& label.Mui-focused": {
                color: "customButton.gold",
              },
              "& .MuiFilledInput-underline:after": {
                borderBottomColor: "customButton.gold",
              },
            }}
          >
            <MenuItem sx={styles.menuItem} value="Simétricos">
              Simétricos
            </MenuItem>
            <MenuItem sx={styles.menuItem} value="Assimétricos">
              Assimétricos
            </MenuItem>

            <MenuItem sx={styles.menuItem} value="Ambos">
              Ambos
            </MenuItem>
          </TextField>

          <TextField
            id="date-initial"
            InputLabelProps={{ shrink: true }}
            label="Data Inicial"
            type="date"
            variant="filled"
            sx={{
              "& .MuiFilledInput-root:after": {
                borderBottomColor: "customButton.gold",
              },
              "& .MuiFilledInput-root.Mui-focused:after": {
                borderBottomColor: "customButton.gold",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "customButton.gold",
              },
              minWidth: "11rem",
            }}
          />

          <TextField
            id="date-final"
            InputLabelProps={{ shrink: true }}
            label="Data Final"
            type="date"
            variant="filled"
            sx={{
              "& .MuiFilledInput-root:after": {
                borderBottomColor: "customButton.gold",
              },
              "& .MuiFilledInput-root.Mui-focused:after": {
                borderBottomColor: "customButton.gold",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "customButton.gold",
              },
              minWidth: "11rem",
            }}
          />
        </Box>
      </Box>
      <Box
        bgcolor={"customBackground.primary"}
        sx={{
          width: "100%",
          padding: "2rem",
          flexGrow: "1",
        }}
      >
        {chartArea}
      </Box>
    </Box>
  );
};

export default Dashboard;
