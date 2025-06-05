import { ResponseApi } from "../interface/responseInterface";
import { suspectInterface, suspectResponseInterface } from "../interface/suspect/suspectInterface";
import { api } from "../server/service";

export async function updateSuspectDetails(
  id: string,
  values: suspectInterface
): Promise<ResponseApi<suspectResponseInterface>> {
  try {
    const response = await api.put<suspectResponseInterface>(`/api/suspeito/${id}`, {
      nome: values.nome,
      apelido: values.apelido,
      cpf: values.cpf,
      relevante: values.relevante,
      anotacoes: values.anotacoes,
    });

    return {
      response: response.data,
      isSuccess: true,
    };
  } catch (error) {
    console.error("Erro ao atualizar os detalhes do suspeito:", error);
    throw error;
  }
}
