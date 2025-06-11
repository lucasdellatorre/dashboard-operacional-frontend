import { Box, MenuItem, TextField, Typography, Collapse, IconButton } from "@mui/material";
import React, { useState, useMemo, useContext, useEffect } from "react";
import WebChart, { Data } from "../../components/dashboard/WebChart/WebChart";
import MultiSelect, { Option } from "../../components/multiSelect";
import { AppContext } from "../../context/AppContext";
import { createWeb } from "../../controllers/webController";
import { WebLink, WebNode } from "../../interface/web/webInterface";
import dayjs from "dayjs";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useNavigate } from "react-router-dom";
import { TeiaLink, TeiaNode, useTeiaMessageCount } from "../../hooks/useTeiaMessageCount";
import { FilterType } from "../../enum/ViewSelectionFilterEnum";
import { graficFilters, MessageFilterGroup, MessageFilterType } from "../../interface/dashboard/chartInterface";
import ViewSelectionFilter from "../../components/filters/ViewSelection";
import { useSuspects } from "../../hooks/useSuspects";

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
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(0, 0, 0, 0.23)",
    },
  },
};

const WebRoute: React.FC = () => {
  const {
    dashboardFilters: filters,
    setDashboardFilters: setFilters,
    operations,
    numbers: selectedNumbers,
    setNumbers: setSelectedNumbers,
    suspects: selectedSuspects,
    setSuspects: setSelectedSuspects,
  } = useContext(AppContext);

  const operationIds = useMemo(
    () => operations.map((op) => op.id),
    [operations]
  );
      const {
        suspects,
        numbers,
        loading,
        error: errorSuspects,
      } = useSuspects({
        searchTerm: "",
        operationIds: operationIds,
      });
    
    const suspectOptions: Option[] = useMemo(() => {
      return suspects.map((suspect) => ({
        id: suspect.id.toString(),
        label: suspect.apelido,
      }));
    }, [suspects]);
  
    const numberOptions: Option[] = useMemo(() => {
      return numbers.map((number) => ({
        id: number.id.toString(),
        label: number.numero,
      }));
    }, [numbers]);
  
    const selectedSuspectIds = useMemo(() => {
      return selectedSuspects.map((suspect) => suspect.id.toString());
    }, [selectedSuspects]);
  
    const selectedNumberIds = useMemo(() => {
      return selectedNumbers.map((number) => number.id.toString());
    }, [selectedNumbers]);

  const [expanded, setExpanded] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!operations[0] && !numbers[0] && !suspects[0]) {
      navigate("/operacoes");
    }
  }, [operations, numbers, suspects, navigate])

  const {
    teiaData,
    isLoading,
    error,
  } = useTeiaMessageCount();

  const [nodes, setNodes] = useState<WebNode[]>([]);
  const [links, setLinks] = useState<WebLink[]>([]);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  useEffect(() => {
    if (!teiaData) return;

    const rawNodes = teiaData.nodes;
    const rawLinks = teiaData.links;

    const knownNodeIds = new Set(rawNodes.map((n) => n.id));
    const allTargetIds = rawLinks.map((l) => l.target);
    const missingTargetNodes = allTargetIds
      .filter((id) => !knownNodeIds.has(id))
      .map((id) => ({ id, group: 6 }));

    const finalNodes: TeiaNode[] = [...rawNodes, ...missingTargetNodes];
    const finalLinks: TeiaLink[] = rawLinks;

    setNodes(finalNodes);
    setLinks(finalLinks);
  }, [teiaData]);

  return (
    <Box
      width="100%"
      bgcolor="#F8F8F8"
      height="100vh"
      display="flex"
      flexDirection="column"
      padding="0"
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
              options={[...suspectOptions, ...numberOptions]}
              selectedOptions={[...selectedSuspectIds, ...selectedNumberIds]}
              onChange={(selected) => {
                const selectedSuspects = suspects.filter((opt) =>
                  selected.includes(opt.id.toString())
                );
                const selectedNumbers = numbers.filter((opt) =>
                  selected.includes(opt.id.toString())
                );
                setSelectedSuspects(selectedSuspects);
                setSelectedNumbers(selectedNumbers);
              }}
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
        flex={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
        overflow="hidden"
      >
        <Box
          width="100%"
          height="100%"
          borderRadius="0"
          boxShadow="0px 0px 20px rgba(0,0,0,0.6)"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <WebChart data={{
            nodes: nodes as WebNode[],
            links: links as WebLink[],
          } as Data}
        />
        </Box>
      </Box>
    </Box>
  );
};

export default WebRoute;
