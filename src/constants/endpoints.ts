const endpoints = {
  DASHBOARD: {
    // EX: página de dashboard
    deleteChart: (chartId: string) => `/chart/${chartId}`,
    getAllChartsRequests: (chartId: string) => `/request/charts/${chartId}`,
    sendReport: "/send/resport/charts/",
  },
  USERS: {},
  SHEETS: {
    getAll: 'api/planilha',
    upload: 'api/interceptacao/upload',
  },
  OPERATIONS: {
    getAll: 'api/operacoes',
  },
};

export default endpoints;
