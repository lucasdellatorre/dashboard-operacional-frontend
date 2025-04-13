import { useMemo } from "react";
import { normalizeString } from "../utils/formatUtils";
import { GenericData } from "../interface/operationSuspectTable/operationSuspectTableInterface";

export interface Operation extends GenericData {
  id: number;
  operationName: string;
  operationDate: string;
  numberOfSuspects: number;
}
interface UseOperationsProps {
  searchTerm: string;
}

export const mockOperations: Operation[] = [
  {
    id: 2934,
    operationName: "Operação A",
    operationDate: "2023-01-01",
    numberOfSuspects: 10,
  },
  {
    id: 3945,
    operationName: "Operação B",
    operationDate: "2023-02-01",
    numberOfSuspects: 20,
  },
  {
    id: 203,
    operationName: "Operação C",
    operationDate: "2023-03-01",
    numberOfSuspects: 30,
  },
];

export const useOperations = ({ searchTerm }: UseOperationsProps) => {
  const filteredOperations = useMemo(() => {
    let result = [...mockOperations];

    if (searchTerm?.trim()) {
      const normalizedSearch = normalizeString(searchTerm.trim());
      result = result.filter(
        (operation) =>
          normalizeString(operation.operationName).includes(normalizedSearch) ||
          String(operation.id).includes(normalizedSearch)
      );
    }

    return result.sort((a, b) =>
      a.operationName.localeCompare(b.operationName)
    );
  }, [searchTerm]);

  return { operations: mockOperations, filteredOperations };
};
