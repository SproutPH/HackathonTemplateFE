import Keycloak from "keycloak-js";
// Function to extract the tenant from the current URL
function getTenantFromUrl() {
  const hostname = window.location.hostname;
  // Assuming the tenant is the subdomain (e.g., tenant1.example.com)
  const subdomain = hostname.split(".")[0];
  return subdomain;
}

const tenant = getTenantFromUrl();

const keycloak = new Keycloak({
  url: import.meta.env.VITE_IDP_URL,
  realm: tenant,
  clientId: import.meta.env.VITE_IDP_CLIENTID,
});

export default keycloak;
