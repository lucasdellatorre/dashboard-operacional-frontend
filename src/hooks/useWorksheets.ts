import { useMemo, useState } from "react";
import { normalizeString } from "../utils/formatUtils";
import { GenericData } from "../interface/operationSuspectTable/operationSuspectTableInterface";

export interface WorkSheet extends GenericData {
  id: number;
  worksheet: string;
  size: string;
  insertedBy: string;
  date: string;
  
}
interface UseOperationsProps {
  searchTerm: string;
}

export const mockWorksheets: WorkSheet[] = [
  {
    id: 1,
    worksheet: "Planilha 1",
    size: "14MB",
    insertedBy: "012.345.678-90",
    operationName: "Operação A",
    date: "01-10-2023",
  },
  {
    id: 2,
    worksheet: "Planilha 2",
    size: "2MB",
    insertedBy: "234.234.234-23",
    operationName: "Operação B, Operação C",
    date: "12-09-2023",
  },
  {
    id: 3,
    worksheet: "Planilha 3",
    size: "1MB",
    insertedBy: "345.345.345-34",
    operationName: "Operação A, Operação C, Operação D, Operação E, Operação F, Operação G, Operação H",
    date: "12-05-2024",
  },
];

export const useWorksheets = ({ searchTerm }: UseOperationsProps) => {

  const [worksheets, setWorksheets] = useState<WorkSheet[]>(mockWorksheets);
  
  const filteredWorksheets = useMemo(() => {
    let result = [...worksheets];

    if (searchTerm?.trim()) {
      const normalizedSearch = normalizeString(searchTerm.trim());
      result = result.filter(
        (worksheet) =>
          normalizeString(worksheet.worksheet).includes(normalizedSearch) ||
          String(worksheet.id).includes(normalizedSearch)
      );
    }

    return result.sort((a, b) => a.worksheet.localeCompare(b.worksheet));
  }, [searchTerm, worksheets]);


  function addWorksheet(
    worksheet: string,
    size: string,
    insertedBy: string,
    date: string
  ) {
    console.log("addWorksheet", worksheet, size, insertedBy, date);
    const newWorksheet: WorkSheet = {
      id: mockWorksheets.length + 1,
      worksheet,
      size,
      insertedBy,
      operationName: "Operação A",
      date,
    };
    setWorksheets((prevWorksheets) => [...prevWorksheets, newWorksheet]);
  }

  return {filteredWorksheets, addWorksheet };
};
