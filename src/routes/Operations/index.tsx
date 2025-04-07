import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { useOperations } from "../../hooks/useOperations";
import { useHeaderInput } from "../../hooks/useHeaderInput";
import { FilterType } from "../../enum/viewSelectionFilterEnum";
import { useNavigate, useSearchParams } from "react-router-dom";
import FilterSelector from "../../components/operations/FilterSelector/FilterSelector";
import OperationsList from "../../components/operations/OperationsList/OperationsList";

const Operation: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { headerInputValue } = useHeaderInput();
  const [selectedFilter, setSelectedFilter] = useState<FilterType>(
    FilterType.CHRONOLOGICAL_ORDER
  );
  const { filteredOperations } = useOperations({
    searchTerm: headerInputValue,
    filter: selectedFilter,
  });

  const handleOperationClick = (id: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("operacao", id);
    navigate(`/alvos?${newSearchParams.toString()}`);
  };

  return (
    <Box p={3} sx={{ fontFamily: "Inter, sans-serif" }}>
      <FilterSelector
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
      />

      <Typography
        variant="h5"
        color="#000000"
        mb={4}
        fontWeight={700}
        sx={{ fontFamily: "Inter, sans-serif" }}
      >
        Selecione uma operação para iniciar investigação
      </Typography>

      <OperationsList
        operations={filteredOperations}
        onOperationClick={handleOperationClick}
      />
    </Box>
  );
};

export default Operation;
