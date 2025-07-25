import axios from "axios";
import { useKeycloakStore } from "./stores/keycloakStore";
import { updateToken } from "./services/KeycloakService";

const getBaseURL = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  if (!apiUrl || apiUrl.includes('localhost')) {
    return '/';
  }
  return apiUrl;
};

const apiClient = axios.create({
  baseURL: getBaseURL(),
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the Keycloak token
apiClient.interceptors.request.use(
  async (config) => {
    const keycloak = useKeycloakStore();
    await updateToken();
    if (keycloak.isAuthenticated) {
      const token = keycloak.userToken;
      config.headers.Authorization = `Bearer ${token}`;
    }

    const domain = window.location.hostname;
    config.headers.domain = domain;
    return config;
  },
  (error) => {
    return Promise.reject(new Error(error));
  }
);

export default apiClient;
