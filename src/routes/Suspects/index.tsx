import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import SuspectCard from "../../components/suspects/SuspectCard/SuspectCard";
import ViewSelection from "../../components/operations/ViewSelection/ViewSelection";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FilterType } from "../../enum/viewSelectionFilterEnum";
import { useHeaderInput } from "../../hooks/useHeaderInput";
import { useSuspects } from "../../hooks/useSuspects";

const FILTER_OPTIONS = [
  { label: "A-Z", value: FilterType.ALPHABETICAL_ORDER },
  { label: "Relevante", value: FilterType.RELEVANT },
  { label: "Ordem Cronológica", value: FilterType.CHRONOLOGICAL_ORDER },
];

const Suspects: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { headerInputValue } = useHeaderInput();
  const [selectedFilter, setSelectedFilter] = useState<FilterType>(
    FilterType.ALPHABETICAL_ORDER
  );
  const operationId = searchParams.get("operacao");

  const { filteredSuspects } = useSuspects({
    searchTerm: headerInputValue,
    filter: selectedFilter,
  });

  const handleSuspectClick = (id: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("operacao", operationId ?? "");
    newSearchParams.set("alvo", id);
    navigate(`/dashboard?${newSearchParams.toString()}`);
  };

  return (
    <Box
      width="100%"
      display="flex"
      height="100vh"
      alignItems="stretch"
      overflow="hidden"
      justifyContent="center"
      sx={{ backgroundPosition: "center" }}
    >
      <Box
        bgcolor="customBackground.primary"
        width="100%"
        display="flex"
        flexDirection="column"
        flex={1}
      >
        <Box
          bgcolor="customBackground.secondary"
          borderBottom={1}
          px="1.5rem"
          py="1rem"
          borderTop={1}
          display="flex"
          gap="0.5rem"
          flexDirection="column"
          borderColor="border.primary"
        >
          <Typography
            fontSize="0.85rem"
            fontWeight={400}
            color="customText.gray"
          >
            Seleção de visualização
          </Typography>
          <ViewSelection
            filters={FILTER_OPTIONS}
            selectedFilter={selectedFilter}
            onChange={setSelectedFilter}
          />
        </Box>

        <Box
          paddingLeft="1.75rem"
          paddingTop="1.875rem"
          display="flex"
          flexDirection="column"
          gap="1.5rem"
        >
          <Typography
            fontSize="1.239rem"
            fontWeight={800}
            color="customText.black"
          >
            Selecione um alvo para iniciar investigação
          </Typography>
          <Box display="flex" flexDirection="row" flexWrap="wrap" gap="2.5rem">
            {filteredSuspects.length === 0 ? (
              <Typography
                fontSize="0.939rem"
                fontWeight={400}
                color="customText.gray"
              >
                Nenhum alvo encontrado com o filtro atual
              </Typography>
            ) : (
              filteredSuspects.map((suspect) => (
                <SuspectCard
                  data-testid="suspect-card"
                  key={suspect.id}
                  name={suspect.name}
                  id={suspect.id}
                  isRelevant={suspect.isRelevant}
                  onClick={() => handleSuspectClick(suspect.id)}
                />
              ))
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Suspects;
