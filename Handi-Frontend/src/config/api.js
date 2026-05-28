const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API_CONFIG = {
  baseUrl: BASE_URL,
  endpoints: {
    requestOTP: `${BASE_URL}/api/auth/request-otp/`,
    verifyOTP: `${BASE_URL}/api/auth/verify-otp/`,
    dashboard: (role) => `${BASE_URL}/api/service/dashboard/${role}/`,

    agentDashboard: {
      acceptTask: (taskID) =>
        `${BASE_URL}/api/service/dashboard/agent/tasks/${taskID}/accept/`,
      manageTasks: `${BASE_URL}/api/service/dashboard/agent/tasks/`,
      getProfile: `${BASE_URL}/api/service/dashboard/agent/edit/`,
      updateProfile: `${BASE_URL}/api/service/me/`,
      reports: `${BASE_URL}/api/service/dashboard/agent/report`,
      teamTechnician: `${BASE_URL}/api/service/dashboard/agent/team/`,
    },

    customerDashboard: {
      packageModal: (taskID) =>
        `${BASE_URL}/api/service/dashboard/customer/requests/${taskID}/`,
      getCustomerData: `${BASE_URL}/api/service/dashboard/customer/requests/`,
      getProfile: `${BASE_URL}/api/service/me/`,
    },

    technicianDashboard: {
      newRequestCard: (taskID) =>
        `${BASE_URL}/api/service/dashboard/technician/requests/${taskID}/`,
      manageTasks: `${BASE_URL}/api/service/dashboard/technician/requests/`,
    },
  },
  timeout: 5000,
};
