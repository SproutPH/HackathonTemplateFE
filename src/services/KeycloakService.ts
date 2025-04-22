import Keycloak from "keycloak-js";
import { useKeycloakStore } from "../stores/keycloakStore";
import apiClient from "../axios";

export const authenticateKeycloak = async () => {
  const keycloakStore = useKeycloakStore();
  // const realm = keycloakStore.getTenantFromUrl();
  const realm = import.meta.env.VITE_IDP_REALM;
  await initKeycloak(
    realm,
    import.meta.env.VITE_IDP_CLIENTID,
    import.meta.env.VITE_IDP_URL
  );
};

export const initKeycloak = async (
  realm: string,
  clientId: string,
  url: string
) => {
  const keycloakStore = useKeycloakStore();
  const initOptions = {
    realm: realm,
    clientId: clientId,
    url: url,
  };
  let keycloak =
    keycloakStore.keycloakApp.instance === ""
      ? new Keycloak(initOptions)
      : keycloakStore.keycloakApp.instance;
  await keycloak.init({ onLoad: "login-required" }).then((auth: any) => {
    if (!auth) {
      window.location.reload();
    }
    console.log("keycloak", keycloak);

    if (keycloak.token) {
      keycloakStore.userToken = keycloak.token;
      keycloakStore.userName = keycloak.tokenParsed.preferred_username;
      keycloakStore.isAuthenticated = keycloak.authenticated;
      keycloakStore.setKeycloakInstance(keycloak);
      keycloakStore.setKeycloakDetails(clientId, realm, url);
    }
  });
};

export const updateToken = async () => {
  const keycloakStore = useKeycloakStore();
  let keycloak = keycloakStore.keycloakApp.instance;
  if (keycloak === "" || keycloak === undefined) {
    await authenticateKeycloak().then(() => {
      keycloak = keycloakStore.keycloakApp.instance;
    });
  }

  await keycloak.updateToken(30).then((refreshed: boolean) => {
    if (refreshed) {
      if ((keycloak.token && keycloak.idToken) != "") {
        keycloakStore.userToken = keycloak.token;
        keycloakStore.userName = keycloak.tokenParsed.preferred_username;
        keycloakStore.isAuthenticated = keycloak.authenticated;
      } else {
        logout();
      }
    }
  });
};

export const logout = async () => {
  const keycloakStore = useKeycloakStore();
  const keycloak = keycloakStore.keycloakApp.instance;
  const logoutOptions = { redirectUri: window.location.origin };
  await keycloak.logout(logoutOptions);
};

export const getKeycloakDetails = async () => {
  try {
    const response = await apiClient.get("/keycloak");
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(new Error(error as string));
  }
};
