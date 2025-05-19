import { useMemo, useState, useEffect } from "react";
import { normalizeString } from "../utils/formatUtils";
import { GenericData } from "../interface/operationSuspectTable/operationSuspectTableInterface";
import { sheetController } from "../controllers/sheetController";

export interface WorkSheet extends GenericData {
  id: number;
  nome: string;
  size: number;
  data_upload: string;
  [key: string]: string | number | string[];
}

interface UseOperationsProps {
  searchTerm: string;
}

export const useWorksheets = ({ searchTerm }: UseOperationsProps) => {
  const [worksheets, setWorksheets] = useState<WorkSheet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchWorksheets = async () => {
      try {
        setIsLoading(true);
        const response = await sheetController.getAllSheets();
        // Transform backend data to match frontend interface
        const transformedWorksheets = Array.isArray(response.Planilhas)
          ? response.Planilhas.map((sheet) => ({
              id: sheet.id,
              nome: sheet.nome,
              size: sheet.size,
              data_upload: sheet.data_upload,
            }))
          : [];
        setWorksheets(transformedWorksheets);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch worksheets'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorksheets();
  }, []);

  const filteredWorksheets = useMemo(() => {
    let result = [...worksheets];

    if (searchTerm?.trim()) {
      const normalizedSearch = normalizeString(searchTerm.trim());
      result = result.filter(
        (worksheet) =>
          normalizeString(worksheet.nome).includes(normalizedSearch) ||
          String(worksheet.id).includes(normalizedSearch)
      );
    }

    return result.sort((a, b) => a.nome.localeCompare(b.nome));
  }, [searchTerm, worksheets]);

  async function addWorksheet(
    nome: string,
    size: number,
    data_upload: string
  ) {
    const newWorksheet: WorkSheet = {
      id: worksheets.length + 1,
      nome,
      size,
      data_upload,
    };
    setWorksheets((prevWorksheets) => [...prevWorksheets, newWorksheet]);
  }

  return { filteredWorksheets, addWorksheet, isLoading, error };
};
