import { useMemo } from "react";
import { normalizeString } from "../utils/formatUtils";
import { GenericData } from "../interface/operationSuspectTable/operationSuspectTableInterface";

export interface WorkSheet extends GenericData {
  id: number;
  worksheet: string;
  date: string;
}
interface UseOperationsProps {
  searchTerm: string;
}

export const mockWorksheets: WorkSheet[] = [
  {
    id: 1,
    worksheet: "Planilha 1",
    date: "01-10-2023",
  },
  {
    id: 2,
    worksheet: "Planilha 2",
    date: "12-09-2023",
  },
  {
    id: 3,
    worksheet: "Planilha 3",
    date: "12-05-2024",
  },
];

export const useWorksheets = ({ searchTerm }: UseOperationsProps) => {
  const filteredWorksheets = useMemo(() => {
    let result = [...mockWorksheets];

    if (searchTerm?.trim()) {
      const normalizedSearch = normalizeString(searchTerm.trim());
      result = result.filter(
        (worksheet) =>
          normalizeString(worksheet.worksheet).includes(normalizedSearch) ||
          String(worksheet.id).includes(normalizedSearch)
      );
    }

    return result.sort((a, b) => a.worksheet.localeCompare(b.worksheet));
  }, [searchTerm]);

  return { worksheets: mockWorksheets, filteredWorksheets };
};
