const endpoints = {
  DASHBOARD: {
    // EX: página de dashboard
    deleteChart: (chartId: string) => `/chart/${chartId}`,
    getAllChartsRequests: (chartId: string) => `/request/charts/${chartId}`,
    sendReport: "/send/resport/charts/",
  },
  SUSPECT: {},
  OPERATION: {
    // EX: página de operações
    createOperation: "api/operacao",
    getAllOperations: "api/operacao",
    getOperationById: (operationId: string) => `/operation/${operationId}`,
  },
  SHEETS: {
    getAll: 'api/planilha',
    upload: 'api/interceptacao/upload',
  },
};

export default endpoints;
