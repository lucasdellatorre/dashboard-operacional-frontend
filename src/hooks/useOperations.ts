import { useEffect, useMemo, useState, useCallback } from "react";
import { normalizeString } from "../utils/formatUtils";
import { GenericData } from "../interface/operationSuspectTable/operationSuspectTableInterface";
import { api } from "../server/service";
import endpoints from "../constants/endpoints";

export interface Operation extends GenericData {
  id: number;
  operationName: string;
  operationDate: string;
  numberOfSuspects: number;
}

interface UseOperationsProps {
  searchTerm: string;
}

export const useOperations = ({ searchTerm }: UseOperationsProps) => {
  const [operations, setOperations] = useState<Operation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const transformApiData = (data: { id: number; nome: string }[]): Operation[] =>
    data.map((op) => ({
      id: op.id,
      operationName: op.nome,
      operationDate: "N/A",
      numberOfSuspects: 0,
    }));

  const fetchOperations = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // simula atraso
      const response = await api.get<{ Operacao: { id: number; nome: string }[] }>(
        endpoints.OPERATION.getAllOperations
      );
      console.log("response: " + JSON.stringify(response.data.Operacao));

      const parsed = transformApiData(response.data.Operacao);
      parsed.forEach((x) => {
        console.log("parsed: " + JSON.stringify(x));
      });
      setOperations(parsed);
    } catch (err) {
      setError(new Error("Erro ao buscar operações"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOperations();
  }, [fetchOperations]);

  const createOperation = useCallback(
    async (operationName: string): Promise<Operation> => {
      try {
        const response = await api.post<{ Operacao: { id: number; nome: string } }>(
          endpoints.OPERATION.createOperation,
          { nome: operationName }
        );

        console.log("Response: " + JSON.stringify(response.data));
        const { id, nome } = response.data.Operacao;

        console.log(nome);

        const newOperation: Operation = {
          id,
          operationName: nome,
          operationDate: "N/A",
          numberOfSuspects: 0,
        };

        return newOperation;
      } catch (err) {
        console.error("Erro ao criar operação:", err);
        throw new Error("Erro ao criar operação");
      }
    },
    []
  );

  const filteredOperations = useMemo(() => {
    const trimmed = searchTerm.trim();

    if (!trimmed) return [...operations].sort(sortByOperationName);

    const normalizedSearch = normalizeString(trimmed);

    return operations
      .filter(
        (operation) =>
          normalizeString(operation.operationName).includes(normalizedSearch) ||
          String(operation.id).includes(normalizedSearch) ||
          normalizeString(operation.operationDate).includes(normalizedSearch)
      )
      .sort(sortByOperationName);
  }, [searchTerm, operations]);

  return {
    filteredOperations,
    loading,
    error,
    setOperations,
    createOperation,
    fetchOperations
  };
};

const sortByOperationName = (a: Operation, b: Operation) =>
  a.operationName.localeCompare(b.operationName);
