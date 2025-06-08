// hooks/useSuspectInfo.ts
import { useEffect, useState } from "react";
import { api } from "../server/service";
import { formatDate } from "../utils/formatUtils";
import {
  suspectInterface,
  suspectResponseInterface,
} from "../interface/suspect/suspectInterface";
import { ResponseApi } from "../interface/responseInterface";

interface Phone {
  numero: string;
  lastUpdateCpf: string;
  lastUpdateDate: string;
}

interface Email {
  email: string;
  lastUpdateCpf: string;
  lastUpdateDate: string;
}

interface IpEntry {
  ip: string;
  ocorrencias: number;
}

export interface SuspectInfo {
  id: number;
  nome: string;
  apelido: string;
  cpf: string;
  relevante: boolean;
  anotacoes: string;
  emails: Email[];
  celulares: Phone[];
  ips: IpEntry[]; // novo formato com contagem
}

export const useSuspectInfo = (id: number) => {
  const [suspect, setSuspect] = useState<SuspectInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSuspect = async () => {
    try {
      setLoading(true);
      const response = await api.get<SuspectInfo>(`/api/suspeito/${id}`);
      const formattedData = {
        ...response.data,
        celulares: response.data.celulares.map((c) => ({
          ...c,
          lastUpdateDate: formatDate(c.lastUpdateDate),
        })),
        emails: response.data.emails.map((c) => ({
          ...c,
          lastUpdateDate: formatDate(c.lastUpdateDate),
        })),
      };
      setSuspect(formattedData);
    } catch (error) {
      setError("Não foi possível carregar os dados do suspeito.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;

    fetchSuspect();
  }, [id]);

  async function updateSuspectDetails(
    id: string,
    values: Partial<suspectInterface>
  ): Promise<ResponseApi<suspectResponseInterface>> {
    try {
      const response = await api.put<suspectResponseInterface>(
        `/api/suspeito/${id}`,
        {
          nome: values.nome,
          apelido: values.apelido,
          cpf: values.cpf,
          relevante: values.relevante,
          anotacoes: values.anotacoes,
        }
      );

      return {
        response: response.data,
        isSuccess: true,
      };
    } catch (error) {
      setError("Erro ao atualizar os dados do suspeito.");
      return {
        response: undefined,
        isSuccess: false,
      };
    }
  }

  return { suspect, loading, error, updateSuspectDetails };
};
