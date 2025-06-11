import { FilterType } from "../../enum/ViewSelectionFilterEnum";

export interface ChartInformation {
  name: string;
}

export interface ChartFilters {
  filterType?: FilterType;
  chart?: FilterType;
  type: MessageFilterType;
  group: MessageFilterGroup; 
  options: string[];         // Lista de alvos selecionados
  dateInitial: string;       // Ex: "2025-06-01"
  dateFinal: string;         // Ex: "2025-06-07"
  timeInitial: string;       // Ex: "08:00"
  timeFinal: string;         // Ex: "18:00"
}

export enum MessageFilterGroup {
  Grupo = "Grupo",
  Numero = "Número",
  Ambos = "Ambos"
}

export enum MessageFilterType {
  Todos = "Todos",
  Imagem = "Imagem",
  Áudio = "Áudio",
  Vídeo = "Vídeo",
  Texto = "Texto",
}

export const MessageTypeToBackend: Record<MessageFilterType, string> = {
  [MessageFilterType.Todos]: "",
  [MessageFilterType.Imagem]: "image",
  [MessageFilterType.Áudio]: "audio",
  [MessageFilterType.Vídeo]: "video",
  [MessageFilterType.Texto]: "text",
};

export const MessageGroupToBackend: Record<MessageFilterGroup, string> = {
  [MessageFilterGroup.Ambos]: "all",
  [MessageFilterGroup.Grupo]: "group",
  [MessageFilterGroup.Numero]: "number"
};