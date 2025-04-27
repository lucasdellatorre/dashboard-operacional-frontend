import { useMemo } from "react";
import { normalizeString } from "../utils/formatUtils";
import { GenericData } from "../interface/operationSuspectTable/operationSuspectTableInterface";

export interface Targets extends GenericData {
  id: number;
  suspectName: string;
  relevance: string;
  date: string;
  operationName: string[];
  type: string;
}
interface UseSuspectsProps {
  searchTerm: string;
}

export const mockSuspects: Targets[] = [
  {
    id: 28933,
    suspectName: "Jorge",
    date: "2024-01-01",
    relevance: "Relevante",
    operationName: ["Operação A", "Operação B"],
    type: "Alvo",
  },
  {
    id: 38466,
    suspectName: "Marcinho",
    date: "2025-01-01",
    relevance: "Não relevante",
    operationName: ["Operação A", "Operação B"],
    type: "Alvo",
  },
  {
    id: 39374,
    suspectName: "Rogerinho",
    date: "2028-01-01",
    relevance: "Não relevante",
    operationName: ["Operação A", "Operação B", "Operação C", "Operação D", "Operação E", "Operação F", "Operação G", "Operação H", "Operação I", "Operação J"],
    type: "Número",
  },
];

export const useSuspects = ({ searchTerm }: UseSuspectsProps) => {
  const filteredSuspects = useMemo(() => {
    let result = [...mockSuspects];

    if (searchTerm?.trim()) {
      const normalizedSearch = normalizeString(searchTerm.trim());
      result = result.filter(
        (suspect) =>
          normalizeString(suspect.suspectName).includes(normalizedSearch) ||
          String(suspect.id).includes(normalizedSearch) ||
          normalizeString(suspect.type).includes(normalizedSearch) ||
          suspect.operationName.some((operation) =>
            normalizeString(operation).includes(normalizedSearch)
          )
      );
    }

    return result.sort((a, b) => a.suspectName.localeCompare(b.suspectName));
  }, [searchTerm]);

  return { operations: mockSuspects, filteredSuspects };
};
