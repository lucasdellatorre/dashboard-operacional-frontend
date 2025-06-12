import { useContext, useEffect, useState } from "react";
import { WebLink, WebNode } from "../interface/web/webInterface";
import { AppContext } from "../context/AppContext";
import { api } from "../server/service";

interface TeiaIpResponse {
  nodes: WebNode[];
  links: WebLink[];
}

export const useTeiaIp = () => {
  const { webChartFilters: filters } = useContext(AppContext);

  const [data, setData] = useState<TeiaIpResponse>({ nodes: [], links: [] });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTeiaData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const payload = {
          ids: 249793, // TODO: dinamicamente
        };
        const response = await api.get("/api/teia/ip-message", {
          params: payload,
        });

        setData({
          nodes: response.data?.nodes ?? [],
          links: response.data?.links ?? [],
        });
      } catch (err: any) {
        setError(err);
        setData({ nodes: [], links: [] });
      } finally {
        setIsLoading(false);
      }
    };
    fetchTeiaData();
  }, [filters]);

  return {
    teiaData: data,
    isLoading,
    error,
  };
};
