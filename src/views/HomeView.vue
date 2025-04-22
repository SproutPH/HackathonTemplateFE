<!-- src/views/Home.vue -->
<template>
  <div>
    <h1>Welcome to Vue Keycloak Example</h1>
    <p v-if="keycloakStore.isAuthenticated">
      User: {{ keycloakStore.userName }}
    </p>
    <button type="button" @click="displayToken">Display Token</button>
    <button type="button" @click="testFetch">Test Endpoint Call </button>
  </div>
</template>

<script setup lang="ts">
import apiClient from "../axios";
import { useKeycloakStore } from "../stores/keycloakStore";

const keycloakStore = useKeycloakStore();

const displayToken = () => {
  alert(keycloakStore.keycloakApp.instance.token);
  console.log(keycloakStore.keycloakApp.instance.token);
};

const testFetch = async () => {
  try {
    const response = await apiClient.get(
      "/ec/api/v1/Statuses/Products"
    );
    alert(JSON.stringify(response.data));

    const response1 = await apiClient.get(
      "/api/v1/statuses/all"
    );
    alert(JSON.stringify(response1.data));
  } catch (error) {
    console.error("Failed to fetch data", error);
  }
};
</script>
