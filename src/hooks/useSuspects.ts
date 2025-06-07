import { useMemo, useState, useEffect, useCallback } from "react";
import { normalizeString } from "../utils/formatUtils";
import { api } from "../server/service";
import { GenericData } from "../interface/table/tableInterface";

export interface SuspectOperation {
  id: number;
  nome: string;
}

export interface SuspectDTO {
  id: number;
  apelido: string;
  relevante: boolean;
  operacoes: SuspectOperation[];
  numeros: string[];
  data_criacao: string;
}

type CreateSuspectDTO = {
  apelido: string;
  cpf: string;
  nome: string;
  numeros_ids: number[];
};

export interface NumbersDTO {
  id: number;
  numero: string;
  operacoes: SuspectOperation[];
}

// DTOs usados na tabela (formatados como string)
export interface Suspect extends GenericData {
  apelido: string;
  relevante: string;
  numeros: string;
  operacoes: string;
  data_criacao: string;
}

export interface Numbers extends GenericData {
  numero: string;
  operacoes: string;
}

interface SuspectList {
  suspeitos: SuspectDTO[];
  numeros: NumbersDTO[];
}

interface UseSuspectsProps {
  searchTerm: string;
  operationIds: number[];
}

export const useSuspects = ({ searchTerm, operationIds }: UseSuspectsProps) => {
  const [data, setData] = useState<SuspectList>({ suspeitos: [], numeros: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createSuspect = useCallback(
    async (
      suspect: CreateSuspectDTO,
      userCpf: string
    ): Promise<CreateSuspectDTO> => {
      try {
        console.log(userCpf);

        const response = await api.post<CreateSuspectDTO>(
          "/api/suspeito",
          suspect,
          {
            headers: {
              cpfUsuario: userCpf,
            },
          }
        );
        return response.data;
      } catch (err: any) {
        console.error("Erro ao criar suspeito:", err);

        const message =
          err.response?.data?.message ||
          err.response?.data?.detail || // caso use FastAPI ou algo similar
          err.message ||
          "Erro ao criar suspeito";

        throw new Error(message);
      }
    },
    []
  );

  const fetchSuspects = useCallback(async () => {
    setLoading(true);
    setError(null);

    const url = `/api/numeros/operacao/${operationIds.join(",")}`;
    console.log("fetching:", url);

    api
      .get<SuspectList>(url)
      .then(({ data }) => setData(data))
      .catch((err) => {
        console.error("Erro ao carregar alvos:", err);
        setError("Não foi possível carregar os alvos.");
      })
      .finally(() => setLoading(false));
  }, [operationIds]);

  // Requisição de dados da APID
  useEffect(() => {
    fetchSuspects();
  }, [operationIds]);

  // Filtro e transformação para exibição na tabela
  const suspects: Suspect[] = useMemo(() => {
    const search = normalizeString(searchTerm.trim());

    return data.suspeitos
      .filter((s) => {
        const ops = s.operacoes.map((op) => normalizeString(op.nome));
        return (
          normalizeString(s.apelido).includes(search) ||
          s.numeros.some((n) => normalizeString(n).includes(search)) ||
          String(s.id).includes(search) ||
          ops.some((op) => op.includes(search))
        );
      })
      .map((s) => ({
        id: s.id,
        apelido: s.apelido,
        relevante: s.relevante ? "Sim" : "Não",
        numeros: s.numeros.join(", "),
        operacoes: s.operacoes.map((op) => op.nome).join(", "),
        data_criacao: s.data_criacao,
      }));
  }, [searchTerm, data.suspeitos]);

  const numbers: Numbers[] = useMemo(() => {
    const search = normalizeString(searchTerm.trim());

    return data.numeros
      .filter((n) => {
        const ops = n.operacoes.map((op) => normalizeString(op.nome));
        return (
          normalizeString(n.numero).includes(search) ||
          String(n.id).includes(search) ||
          ops.some((op) => op.includes(search))
        );
      })
      .map((n) => ({
        id: n.id,
        numero: n.numero,
        operacoes: n.operacoes.map((op) => op.nome).join(", "),
      }));
  }, [searchTerm, data.numeros]);

  return {
    fetchSuspects,
    createSuspect,
    suspects,
    numbers,
    loading,
    error,
  };
};
