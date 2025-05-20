import { useMemo, useState, useEffect } from "react";
import { normalizeString } from "../utils/formatUtils";
import { api } from "../server/service";
import { GenericData } from "../interface/operationSuspectTable/operationSuspectTableInterface";

export interface SuspectOperation {
  id: number;
  nome: string;
}

export interface Suspect {
  id: number;
  apelido: string;
  relevante: boolean;
  operacoes: SuspectOperation[];
  numeros: string[];
  data_criacao: string;
}

export interface Numbers {
  id: number;
  numero: string;
  operacoes: SuspectOperation[];
}

export interface SuspectList {
  suspeitos: Suspect[];
  numeros: Numbers[];
}

export interface Targets extends GenericData {
  suspectName: string;
  number: string;
  relevance: string;
  date: string;
  operationName: string[];
  type: string;
}

interface UseSuspectsProps {
  searchTerm: string;
  operationIds: number[];
}

export const useSuspects = ({ searchTerm, operationIds }: UseSuspectsProps) => {
  const [data, setData] = useState<{ suspectTargets: Targets[]; numberTargets: Targets[] }>({
    suspectTargets: [],
    numberTargets: [],
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const url = `/api/numeros/operacao/${operationIds.join(",")}`;
    console.log("fetching: " + url);

    api.get<SuspectList>(url)
      .then((response) => {
        const { suspeitos, numeros } = response.data;

        const suspectTargets: Targets[] = suspeitos.map((suspect) => ({
          id: suspect.id,
          suspectName: suspect.apelido,
          number: suspect.numeros.join(", "),
          relevance: suspect.relevante ? "Relevante" : "Não relevante",
          date: suspect.data_criacao,
          operationName: suspect.operacoes.map((op) => op.nome),
          type: "Alvo",
        }));



        const numberTargets: Targets[] = numeros.map((numero) => ({
          id: numero.id,
          suspectName: "—",
          number: numero.numero,
          relevance: "—",
          date: "—",
          operationName: numero.operacoes.map((op) => op.nome),
          type: "Número",
        }));

        setData({ suspectTargets, numberTargets });
      })
      .catch((err) => {
        console.error("Erro ao carregar alvos:", err);
        setError("Não foi possível carregar os alvos.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [operationIds]);

  const filteredSuspects = useMemo(() => {
    const all = [...data.suspectTargets, ...data.numberTargets];

    if (searchTerm?.trim()) {
      const normalizedSearch = normalizeString(searchTerm.trim());
      return all.filter(
        (s) =>
          normalizeString(s.suspectName).includes(normalizedSearch) ||
          String(s.id).includes(normalizedSearch) ||
          normalizeString(s.type).includes(normalizedSearch) ||
          s.operationName.some((op) => normalizeString(op).includes(normalizedSearch))
      );
    }

    return all;
  }, [searchTerm, data]);

  return {
    suspectTargets: data.suspectTargets,
    numberTargets: data.numberTargets,
    filteredSuspects,
    loading,
    error,
  };
};
