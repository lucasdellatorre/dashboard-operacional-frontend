import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import FolderCard from "../OperationCard/OperationCard";

interface Operation {
  id: string;
  title: string;
}

interface OperationsListProps {
  operations: Operation[];
  onOperationClick: (id: string) => void;
}

const OperationsList: React.FC<OperationsListProps> = ({
  operations,
  onOperationClick,
}) => {
  if (operations.length === 0) {
    return (
      <Typography
        fontSize="0.939rem"
        fontWeight={400}
        color="customText.gray"
        width="100%"
        textAlign="center"
        mt={2}
      >
        Nenhuma operação encontrada com o filtro atual
      </Typography>
    );
  }

  return (
    <Stack direction="row" spacing={1.5} width="100%" sx={{ mx: -1 }}>
      {operations.map((operation, index) => (
        <Box
          key={index}
          width={{
            xs: "100%",
            sm: "50%",
            md: "33.33%",
            lg: "20%",
          }}
          p={1}
          mb={2}
        >
          <FolderCard
            data-testid="operation-card"
            title={operation.title}
            id={operation.id}
            onClick={() => onOperationClick(operation.id)}
          />
        </Box>
      ))}
    </Stack>
  );
};

export default OperationsList;
