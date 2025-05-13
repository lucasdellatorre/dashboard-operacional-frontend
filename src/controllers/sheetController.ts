import axios from 'axios';
import endpoints from '../constants/endpoints';

export interface SheetResponse {
  Planilhas: Array<{
    id: number;
    nome: string;
    data_upload: string;
    size: number;
  }>;
}

class SheetController {
  async getAllSheets(): Promise<SheetResponse> {
    try {
      const response = await axios.get<SheetResponse>(endpoints.SHEETS.getAll);
      return response.data;
    } catch (error) {
      console.error('Error fetching sheets:', error);
      throw error;
    }
  }
}

export const sheetController = new SheetController();
