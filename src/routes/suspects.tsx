import { Box, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import SuspectCard from "../components/suspectCard";
import ViewSelection from "../components/viewSelection";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FilterType } from "../enum/viewSelectionFilterEnum";
import { normalizeString } from "../utils/formatUtils";
import { useHeaderInput } from "../hooks/useHeaderInput";

interface SuspectInterface {
  name: string;
  isRelevant: boolean;
  id: string;
}

const Suspects: React.FC = () => {
  const { headerInputValue } = useHeaderInput();
  const [selectedFilter, setSelectedFilter] = useState<FilterType>(
    FilterType.ALPHABETICAL_ORDER
  );
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const operationId = searchParams.get("operacao");

  const filter = [
    { label: "A-Z", value: FilterType.ALPHABETICAL_ORDER },
    { label: "Relevante", value: FilterType.RELEVANT },
  ];
  const mockSuspects = useMemo<SuspectInterface[]>(
    () => [
      {
        name: "Zé Pequeno",
        isRelevant: true,
        id: "#1s2b2a36i8 ",
      },
      {
        name: "Inácio",
        isRelevant: true,
        id: "#1s2b2a3409",
      },
      {
        name: "Fernando",
        isRelevant: false,
        id: "#1s2b2a3h68",
      },
      {
        name: "Geraldo",
        isRelevant: false,
        id: "#1s2b2a9836",
      },
    ],
    []
  );

  const filteredSuspects = useMemo(() => {
    let result = [...mockSuspects];

    if (headerInputValue && headerInputValue.trim() !== "") {
      const searchTerm = normalizeString(headerInputValue.trim());
      result = result.filter((suspect) =>
        normalizeString(suspect.name).includes(searchTerm)
      );
    }

    if (selectedFilter === FilterType.RELEVANT) {
      return result.filter((suspect) => suspect.isRelevant);
    }
    return [...result].sort((a, b) => a.name.localeCompare(b.name));
  }, [mockSuspects, selectedFilter, headerInputValue]);

  const selectSuspects = (id: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("operacao", operationId ?? "");
    newSearchParams.set("alvoId", id);
    navigate(`/dashboard?${newSearchParams.toString()}`);
  };

  return (
    <Box
      width={"100%"}
      display={"flex"}
      height={"100vh"}
      alignItems={"stretch"}
      overflow={"hidden"}
      justifyContent={"center"}
      sx={{
        backgroundPosition: "center",
      }}
    >
      <Box
        bgcolor={"customBackground.primary"}
        width={"100%"}
        display={"flex"}
        flexDirection={"column"}
        flex={1}
      >
        <Box
          bgcolor={"customBackground.secondary"}
          borderBottom={1}
          px={"1.5rem"}
          py="1rem"
          borderTop={1}
          display={"flex"}
          gap="0.5rem"
          flexDirection={"column"}
          borderColor={"border.primary"}
        >
          <Typography
            fontSize={"0.85rem"}
            fontWeight={400}
            color={"customText.gray"}
          >
            Seleção de visualização
          </Typography>
          <ViewSelection
            filters={filter}
            selectedFilter={selectedFilter}
            onChange={(value) => setSelectedFilter(value)}
          />
        </Box>

        <Box
          paddingLeft={"1.75rem"}
          paddingTop={"1.875rem"}
          display={"flex"}
          flexDirection={"column"}
          gap="1.5rem"
        >
          <Typography
            fontSize={"1.239rem"}
            fontWeight={800}
            color={"customText.black"}
          >
            Selecione um alvo para iniciar investigação
          </Typography>
          <Box display="flex" flexDirection="row" flexWrap="wrap" gap="2.5rem">
            {filteredSuspects.length === 0 && (
              <Typography
                fontSize={"0.939rem"}
                fontWeight={400}
                color={"customText.gray"}
              >
                Nenhum alvo encontrado com o filtro atual
              </Typography>
            )}
            {filteredSuspects.map((suspect) => (
              <SuspectCard
                data-testid="suspect-card"
                key={suspect.id}
                onClick={(value) => selectSuspects(value)}
                name={suspect.name}
                id={suspect.id}
                isRelevant={suspect.isRelevant}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Suspects;
