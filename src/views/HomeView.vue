<!-- src/views/Home.vue -->
<template>
  <div>
    <h1>Welcome to Vue Keycloak Example</h1>
    <p v-if="keycloakStore.isAuthenticated">
      User: {{ keycloakStore.userName }}
    </p>
    <spr-button tone="success"@click="displayToken">Display Token</spr-button>
    <spr-button tone="danger"@click="testFetch">Test Endpoint Call</spr-button>
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
    const response1 = await apiClient.get("/api/notes");
    alert(JSON.stringify(response1.data));
  } catch (error) {
    console.error("Failed to fetch data", error);
  }
};
</script>
