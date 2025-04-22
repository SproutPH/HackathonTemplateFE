<script setup lang="ts">
import { RouterView } from "vue-router";
import { onMounted } from "vue";
import { useKeycloakStore } from "./stores/keycloakStore";
import { authenticateKeycloak, updateToken } from "./services/KeycloakService";

const keycloakStore = useKeycloakStore();

onMounted(async () => {
  if (!keycloakStore.hasKeycloakInstance()) {
    await authenticateKeycloak();
  }
  setInterval(async () => {
    await updateToken();
  }, 60000); //
});
</script>

<template>
  <TheHeader />

  <RouterView />
</template>

<style scoped>
* {
  font-family: "Roboto", sans-serif;
}
</style>
