import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Response interceptor (improved logging)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API ERROR:", error.response?.data || error);

    const message =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong";

    return Promise.reject(new Error(message));
  }
);

// ====================
// Assets API
// ====================
export const assetsApi = {
  getAll: (params?: { type?: string; status?: string; page?: number }) =>
    apiClient.get("/api/assets", { params }),

  getById: (id: string) => apiClient.get(`/api/assets/${id}`),

  // ✅ FIXED: JSON request (NO FormData)
  create: (data: {
    title: string;
    description: string;
    assetType: string;
    creatorId: string;
    creatorAddress: string;
    licenseType: string;
    content?: string;
  }) => apiClient.post("/api/assets", data),

  mint: (id: string) => apiClient.post(`/api/assets/${id}/mint`),

  delete: (id: string) => apiClient.delete(`/api/assets/${id}`),
};

// ====================
// Licenses API
// ====================
export const licensesApi = {
  getAll: (assetId?: string) =>
    apiClient.get("/api/licenses", { params: { assetId } }),

  getById: (id: string) => apiClient.get(`/api/licenses/${id}`),

  create: (data: {
    assetId: string;
    licenseeId: string;
    licenseType: string;
    terms: string;
    royaltyPercent: number;
    expiresAt?: string;
  }) => apiClient.post("/api/licenses", data),

  revoke: (id: string) =>
    apiClient.patch(`/api/licenses/${id}/revoke`),
};

// ====================
// Infringements API
// ====================
export const infringementsApi = {
  getAll: (assetId?: string) =>
    apiClient.get("/api/infringements", { params: { assetId } }),

  detect: (assetId: string) =>
    apiClient.post(`/api/infringements/detect`, { assetId }),

  resolve: (id: string) =>
    apiClient.patch(`/api/infringements/${id}/resolve`),
};

// ====================
// Dashboard API
// ====================
export const dashboardApi = {
  getStats: () => apiClient.get("/api/dashboard/stats"),
};

export default apiClient;