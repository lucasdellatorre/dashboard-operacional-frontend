import { useMemo } from "react";
import { FilterType } from "../enum/viewSelectionFilterEnum";
import { normalizeString } from "../utils/formatUtils";

interface Suspect {
  name: string;
  isRelevant: boolean;
  id: string;
  dateCreated: string;
}

interface UseSuspectsProps {
  searchTerm: string;
  filter: FilterType;
}

const mockSuspects: Suspect[] = [
  {
    name: "Zé Pequeno",
    isRelevant: true,
    id: "#1s2b2a36i8",
    dateCreated: "2025-04-01",
  },
  {
    name: "Inácio",
    isRelevant: true,
    id: "#1s2b2a3409",
    dateCreated: "2025-04-02",
  },
  {
    name: "Fernando",
    isRelevant: false,
    id: "#1s2b2a3h68",
    dateCreated: "2025-04-01",
  },
  {
    name: "Geraldo",
    isRelevant: false,
    id: "#1s2b2a9836",
    dateCreated: "2025-04-01",
  },
];

export const useSuspects = ({ searchTerm, filter }: UseSuspectsProps) => {
  const filteredSuspects = useMemo(() => {
    let result = [...mockSuspects];

    if (searchTerm?.trim()) {
      const normalizedSearch = normalizeString(searchTerm.trim());
      result = result.filter(
        (suspect) =>
          normalizeString(suspect.name).includes(normalizedSearch) ||
          String(suspect.id).includes(normalizedSearch)
      );
    }

    if (filter === FilterType.RELEVANT) {
      return result.filter((suspect) => suspect.isRelevant);
    }

    if (filter === FilterType.CHRONOLOGICAL_ORDER) {
      return result.sort((a, b) => b.dateCreated.localeCompare(a.dateCreated));
    }

    return result.sort((a, b) => a.name.localeCompare(b.name));
  }, [searchTerm, filter]);

  return { suspects: mockSuspects, filteredSuspects };
};
