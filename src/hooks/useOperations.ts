import { useMemo } from "react";
import { FilterType } from "../enum/viewSelectionFilterEnum";
import { normalizeString } from "../utils/formatUtils";

interface Operation {
  id: string;
  title: string;
  date: string;
  relevance: number;
}

interface UseOperationsProps {
  searchTerm: string;
  filter: FilterType;
}

const mockOperations: Operation[] = [
  {
    id: "ID:#1fs2b2a36i8",
    title: "Castelo Branco",
    date: "2024-03-20",
    relevance: 5,
  },
  {
    id: "ID:#1fs2b2a36i8",
    title: "Prainha",
    date: "2024-03-19",
    relevance: 3,
  },
  {
    id: "ID:#1fs2b2a36i8",
    title: "Sucuri",
    date: "2024-03-18",
    relevance: 4,
  },
  {
    id: "ID:#1fs2b2a36i8",
    title: "Nicotina",
    date: "2024-03-17",
    relevance: 2,
  },
  {
    id: "ID:#1fs2b2a36i8",
    title: "Carne Fraca",
    date: "2024-03-16",
    relevance: 1,
  },
];

export const useOperations = ({ searchTerm, filter }: UseOperationsProps) => {
  const filteredOperations = useMemo(() => {
    let result = [...mockOperations];

    if (searchTerm?.trim()) {
      const normalizedSearch = normalizeString(searchTerm.trim());
      result = result.filter(
        (operation) =>
          normalizeString(operation.title).includes(normalizedSearch) ||
          String(operation.id).includes(normalizedSearch)
      );
    }

    if (filter === FilterType.RELEVANT) {
      return result.sort((a, b) => b.relevance - a.relevance);
    }

    if (filter === FilterType.CHRONOLOGICAL_ORDER) {
      return result.sort((a, b) => b.date.localeCompare(a.date));
    }

    return result.sort((a, b) => a.title.localeCompare(b.title));
  }, [searchTerm, filter]);

  return { operations: mockOperations, filteredOperations };
};
