import { Box, Typography } from "@mui/material";
import React from "react";
import { FilterType } from "../../../enum/viewSelectionFilterEnum";

interface FilterSelectorProps {
  selectedFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const FilterSelector: React.FC<FilterSelectorProps> = ({
  selectedFilter,
  onFilterChange,
}) => {
  return (
    <Box display="flex" flexDirection="column" gap="0.5rem" mb="2rem">
      <Typography
        fontSize="0.875rem"
        color="#777779"
        fontWeight={400}
        fontFamily="Inter, sans-serif"
      >
        Filtrar por:
      </Typography>

      {/* Container do Filtro */}
      <Box
        width="21.25rem"
        height="2.688rem"
        bgcolor="rgba(0, 0, 0, 0.05)"
        borderRadius="0.5rem"
        position="relative"
        display="flex"
        padding="0.25rem"
      >
        {/* Indicador de seleção animado */}
        <Box
          position="absolute"
          width="6.75rem"
          height="2.188rem"
          bgcolor="#FFFFFF"
          borderRadius="0.5rem"
          left="0.25rem"
          top="0.25rem"
          sx={{
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
            transform:
              selectedFilter === FilterType.CHRONOLOGICAL_ORDER
                ? "translateX(0)"
                : selectedFilter === FilterType.ALPHABETICAL_ORDER
                ? "translateX(7rem)"
                : "translateX(14rem)",
          }}
        />

        {/* Container dos Botões */}
        <Box display="flex" width="100%" position="relative" zIndex={1}>
          {/* Botão Recentes */}
          <Box
            onClick={() => onFilterChange(FilterType.CHRONOLOGICAL_ORDER)}
            flex={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ cursor: "pointer" }}
          >
            <Typography
              fontSize="0.875rem"
              fontFamily="Inter, sans-serif"
              color={
                selectedFilter === FilterType.CHRONOLOGICAL_ORDER
                  ? "#000000"
                  : "rgba(0, 0, 0, 0.7)"
              }
              fontWeight={
                selectedFilter === FilterType.CHRONOLOGICAL_ORDER ? 600 : 500
              }
              sx={{
                transition: "all 0.2s ease",
              }}
            >
              Recentes
            </Typography>
          </Box>

          {/* Botão A-Z */}
          <Box
            onClick={() => onFilterChange(FilterType.ALPHABETICAL_ORDER)}
            flex={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ cursor: "pointer" }}
          >
            <Typography
              fontSize="0.875rem"
              color={
                selectedFilter === FilterType.ALPHABETICAL_ORDER
                  ? "#000000"
                  : "rgba(0, 0, 0, 0.7)"
              }
              fontWeight={
                selectedFilter === FilterType.ALPHABETICAL_ORDER ? 600 : 500
              }
              sx={{
                fontFamily: "Inter, sans-serif",
                transition: "all 0.2s ease",
              }}
            >
              A-Z
            </Typography>
          </Box>

          {/* Botão Relevantes */}
          <Box
            onClick={() => onFilterChange(FilterType.RELEVANT)}
            flex={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ cursor: "pointer" }}
          >
            <Typography
              fontSize="0.875rem"
              fontFamily="Inter, sans-serif"
              color={
                selectedFilter === FilterType.RELEVANT
                  ? "#000000"
                  : "rgba(0, 0, 0, 0.7)"
              }
              fontWeight={selectedFilter === FilterType.RELEVANT ? 600 : 500}
              sx={{
                transition: "all 0.2s ease",
              }}
            >
              Relevantes
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FilterSelector;
