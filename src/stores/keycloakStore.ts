import { defineStore } from "pinia";
import { reactive, ref, watch } from "vue";

interface IKeycloak {
  instance: any;
}

export const useKeycloakStore = defineStore("keycloak", () => {
  const keycloak = ref({
    clientId: "",
    url: "",
    realm: "",
  });

  const keycloakApp: IKeycloak = reactive({
    instance: "",
  });
  const hasKeycloakInstance = () => {
    return keycloakApp.instance !== "";
  };

  const userToken = ref("");
  const userName = ref("");
  const isAuthenticated = ref("");

  const resetKeycloak = () => {
    keycloak.value.realm = "";
    keycloak.value.url = "";
    keycloak.value.clientId = "";
    keycloakApp.instance = "";
    localStorage.clear();
  };

  if (localStorage.getItem("keycloak"))
    keycloak.value = JSON.parse(localStorage.getItem("keycloak") ?? "");
  watch(
    keycloak,
    (state) => {
      // persist the whole state to the local storage whenever it changes
      localStorage.setItem("keycloak", JSON.stringify(state));
    },
    { deep: true }
  );

  const setKeycloakInstance = (instance: any) => {
    keycloakApp.instance = instance;
  };

  const setKeycloakDetails = (clientId: string, realm: string, url: string) => {
    keycloak.value.clientId = clientId;
    keycloak.value.realm = realm;
    keycloak.value.url = url;
  };
  const getTenantFromUrl = () => {
    const hostname = window.location.hostname;
    // Assuming the tenant is the subdomain (e.g., tenant1.example.com)
    const subdomain = hostname.split(".")[0];
    return subdomain;
  };
  return {
    userToken,
    userName,
    isAuthenticated,
    keycloak,
    keycloakApp,
    hasKeycloakInstance,
    setKeycloakDetails,
    setKeycloakInstance,
    resetKeycloak,
    getTenantFromUrl,
  };
});
