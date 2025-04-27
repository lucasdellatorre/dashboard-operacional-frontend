import { Box, MenuItem, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import BarChartGeneric from "../../components/dashboard/WebChart/BarChart";
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
  { value: FilterType.SIZE, label: "Tamanho" },
  { value: FilterType.DATA, label: "Data" },
];
const selectionTypeFilter = [
  { value: FilterType.UNION, label: "União" },
  { value: FilterType.INCOMMON, label: "Em Comum" },
  { value: FilterType.BETWEENTARGETS, label: "Entre Alvos" },
];

//Dados Mockados
const contacts = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
];
const mensagensPorContato = [
  50, 37, 40, 425, 80, 385, 90, 275, 490, 310, 245, 380, 295, 410, 330,
];
const tamanhoTotalPorContato = [
  1200, 900, 1100, 8000, 1500, 7000, 1600, 5000, 9000, 6000, 4800, 7500, 5900,
  8200, 6600,
];

const options = ["Jorge", "Marcinho", "Rogerinho"];


const Dashboard: React.FC = () => {
  const [selectedFilterType, setSelectedFilterType] = useState<FilterType>(FilterType.UNION);

  const [selectedChart, setSelectedChart] = useState<FilterType>(FilterType.ALL);

  const [selectedType, setSelectedType] = useState("Texto");
  const [selectedGroup, setSelectedGroup] = useState("Ambos");

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  function getSelectedChart() {
    switch (selectedChart) {
      case FilterType.ALL:
        return getChartAll();
      case FilterType.INTERACTIONS:
        return getChartInteractions();
      case FilterType.IP:
        return getChartIP();
      case FilterType.SIZE:
        return getChartSize();
      default:
        return getChartAll();
    }
  }

  function getChartAll() {
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
        <Box
          sx={{ cursor: "pointer", width: "48%" }}
          onClick={() => setSelectedChart(FilterType.INTERACTIONS)}
        >
          {getChartInteractions()}
        </Box>
        <Box
          sx={{ cursor: "pointer", width: "48%" }}
          onClick={() => setSelectedChart(FilterType.IP)}
        >
          {getChartSize()}
        </Box>
      </Box>
    );
  }

  function getChartInteractions() {
    return (
      <BarChartGeneric
        contacts={contacts}
        data={
          selectedChart === FilterType.INTERACTIONS
            ? mensagensPorContato
            : tamanhoTotalPorContato
        }
        title="Mensagens por Contato"
        subtitle="Número de"
        tooltipLabel="Total"
        expanded={selectedChart === FilterType.INTERACTIONS}
      />
    );
  }

  function getChartIP() {
    //todo
    return <div>Gráfico de IP</div>;
  }
  function getChartSize() {  
    return (
      <BarChartGeneric
        contacts={contacts}
        data={tamanhoTotalPorContato}
        title="Tamanho da mensagem por contato"
        subtitle="Número médio do"
        tooltipLabel="Tamanho"
        expanded={selectedChart === FilterType.SIZE}
      />
    )
  }

  return (
    <Box
      bgcolor={"customBackground.primary"}
      width={"100%"}
      display={"flex"}
      flexDirection={"column"}
      height={"100vh"}
      alignItems={"stretch"}
      overflow={"hidden"}
      justifyContent={"flex-start"}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Typography
          fontFamily={"Inter, sans-serif"}
          fontWeight={600}
          fontSize={"1.25rem"}
          padding={1}
        >
          Seleção de Gráficos
        </Typography>

        <ViewSelectionFilter
          filters={graficFilters}
          selectedFilter={selectedChart}
          onChange={(value) => setSelectedChart(value)} 
        />
      </Box>

      <Box height={"0.07rem"} bgcolor={"divider"} width={"100%"} />

      <Box
        bgcolor={"customBackground.secondary"}
        width={"100%"}
        display={"flex"}
        px={"1rem"}
        py={"0.7rem"}
        flexDirection={"row"}
        justifyContent={"left"}
        gap={"2rem"}
      >
        <Box width={"29rem"}>
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

        <Box>
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
        <Typography variant="caption" fontFamily={"Inter, sans-serif"} fontWeight={600}> Filtrar por: </Typography>

        <Box display={"flex"} flexDirection={"row"} gap={"2rem"}>

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
            <MenuItem
              value="Grupo"
              sx={styles.menuItem}
            >
              Grupo
            </MenuItem>
            <MenuItem
              sx={styles.menuItem}
              value="Número"
            >
              Número
            </MenuItem>
            <MenuItem
              sx={styles.menuItem}
              value="Ambos"
            >
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
            <MenuItem
              value="Texto"
              sx={styles.menuItem}
            >
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
            <MenuItem
              sx={styles.menuItem}
              value="Todos"
            >
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
            <MenuItem
              sx={styles.menuItem}
              value="Simétricos"
            >
              Simétricos
            </MenuItem>
            <MenuItem
              sx={styles.menuItem}
              value="Assimétricos"
            >
              Assimétricos
            </MenuItem>

            <MenuItem
              //use the styles const
              sx={styles.menuItem}
              value="Ambos"
            >
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
        sx={{
          width: "100%",
          padding: "2rem",
        }}
      >
        {getSelectedChart()}
      </Box>
    </Box>
  );
};

export default Dashboard;
