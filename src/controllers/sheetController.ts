import axios from 'axios';
import endpoints from '../constants/endpoints';
import { api } from '../server/service';

export interface SheetResponse {
  Planilhas: Array<{
    id: number;
    nome: string;
    data_upload: string;
    size: number;
  }>;
}

export interface SheetUploadRequest {
  file: File;
  operacaoId: string;
}

class SheetController {
  async getAllSheets(): Promise<SheetResponse> {
    try {
      const response = await api.get<SheetResponse>(endpoints.SHEETS.getAll);
      return response.data;
    } catch (error) {
      console.error('Error fetching sheets:', error);
      throw error;
    }
  }

  async uploadSheet(request: SheetUploadRequest): Promise<{ Message: string }> {
    try {
      const formData = new FormData();
      formData.append('file', request.file);
      formData.append('operacaoId', request.operacaoId);

      console.log('Request details:', {
        file: request.file,
        operacaoId: request.operacaoId,
        formData: Object.fromEntries(formData.entries())
      });

      const response = await api.post<{ Message: string }>(
        endpoints.SHEETS.upload,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error uploading sheet:', error);
      if (axios.isAxiosError(error)) {
        console.error('Request details:', {
          url: error.config?.url,
          method: error.config?.method,
          headers: error.config?.headers,
          data: error.config?.data
        });
        console.error('Response data:', error.response?.data);
      }
      throw error;
    }
  }
}

export const sheetController = new SheetController();
