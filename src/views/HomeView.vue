<!-- src/views/Home.vue -->
<template>
  <div>
    <h1>Welcome to Vue Keycloak Example</h1>
    <p v-if="keycloakStore.isAuthenticated">
      User: {{ keycloakStore.userName }}
    </p>
    <button type="button" @click="displayToken">Display Token</button>
    <button type="button" @click="testFetch">Test Endpoint Call</button>

    <div
      class="mx-auto flex max-w-sm items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
    >
      <div>
        <div class="text-xl font-medium text-black dark:text-white">
          ChitChat
        </div>
        <p class="text-gray-500 dark:text-gray-400">You have a new message!</p>
      </div>
    </div>
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
    const response = await apiClient.get("/ec/api/v1/Statuses/Products");
    alert(JSON.stringify(response.data));

    const response1 = await apiClient.get("/api/v1/statuses/all");
    alert(JSON.stringify(response1.data));
  } catch (error) {
    console.error("Failed to fetch data", error);
  }
};
</script>
