const endpoints = {
  DASHBOARD: {
    // EX: página de dashboard
    deleteChart: (chartId: string) => `/chart/${chartId}`,
    getAllChartsRequests: (chartId: string) => `/request/charts/${chartId}`,
    sendReport: "/send/resport/charts/",
  },
  USERS: {},
};

export default endpoints;
