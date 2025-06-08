import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { BarChartData } from "../components/dashboard/WebChart/BarChart";
import { api } from "../server/service";
import { MessageGroupToBackend, MessageTypeToBackend } from "../interface/dashboard/chartInterface";

export const useContactMessages = (): BarChartData[] => {
    const {
        dashboardFilters: filters,
        numbers,
        suspects,
        operations,
    } = useContext(AppContext);

    const [data, setData] = useState<BarChartData[]>([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const payload = {
                    numeros: [],//numbers.map((n) => n.numero),
                    grupo: MessageGroupToBackend[filters.group],
                    tipo: MessageTypeToBackend[filters.type],
                    data_inicial: filters.dateInitial || null,
                    data_final: filters.dateFinal || null,
                    hora_inicio: filters.timeInitial || null,
                    hora_fim: filters.timeFinal || null,
                    operacoes: operations.map((o) => o.id),
                    suspeitos: suspects.map((s) => s.cpf),
                };

                console.log("Buscando mensagens: " + JSON.stringify(payload));

                const response = await api.get("/api/mensagens/contatos", {
                    params: payload,
                });

                console.log("Response: " + JSON.stringify(response.data));

                const formatted: BarChartData[] = (response.data || []).map(
                    (item: any) => ({
                        key: item.contato?.toString() || "desconhecido",
                        value: item.qtdMensagens ?? 0,
                    })
                );

                setData(formatted);
            } catch (error) {
                console.error("Failed to fetch contact messages:", error);
                setData([]);
            }
        };

        fetchMessages();
    }, [
        numbers,
        suspects,
        operations,
        filters.group,
        filters.type,
        filters.dateInitial,
        filters.dateFinal,
        filters.timeInitial,
        filters.timeFinal,
    ]);

    return data;
};
