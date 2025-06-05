import { api } from "../server/service";


export async function getIpMessageCounts(ids: (string | number)[]): Promise<any> {
  const numericIds = ids.map(id => Number(id));
  const params = { ids: numericIds.join(",") };
  const response = await api.get("/teia/ip-message", { params });
  return response.data;
} 