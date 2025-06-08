import endpoints from "../constants/endpoints";
import { api } from "../server/service";
import { CreateWeb, WebResponse } from "../interface/web/webInterface";

export async function createWeb(data: CreateWeb): Promise<WebResponse> {
  const response = await api.post<WebResponse>(endpoints.WEB.createWeb, data);
  return response.data;
}
