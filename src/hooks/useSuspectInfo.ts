// hooks/useSuspectInfo.ts
import { useEffect, useState } from "react";
import { api } from "../server/service";
import { formatDate } from "../utils/formatUtils";

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

    useEffect(() => {
        if (!id) return;

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
                setSuspect(formattedData)
            } catch (err) {
                console.error("Erro ao buscar suspeito:", err);
                setError("Não foi possível carregar os dados do suspeito.");
            } finally {
                setLoading(false);
            }
        };

        fetchSuspect();
    }, [id]);

    return { suspect, loading, error };
};
