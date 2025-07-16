<!-- src/views/HomeView.vue -->
<template>
  <div
    class="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 space-y-6"
  >
    <div class="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
      <h1 class="text-2xl font-semibold mb-4 text-center text-gray-800">
        Welcome to Home Sprout Hackaton 2025
      </h1>
      <p
        v-if="keycloakStore.isAuthenticated"
        class="mb-6 text-center text-gray-600"
      >
        User: <span class="font-medium">{{ keycloakStore.userName }}</span>
      </p>
      <div
        class="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 sm:justify-center"
      >
        <spr-button tone="success" @click="displayToken"
          >Display Token</spr-button
        >
        <spr-button tone="danger" @click="logout" v-if="keycloakStore.isAuthenticated"
          >Logout</spr-button>
      </div>
    </div>

    <div class="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
      <h2 class="text-xl font-semibold mb-4 text-gray-800">
        Fetch Employee by ID
      </h2>
      <div class="flex items-center space-x-2 mb-4">
        <spr-input
          v-model="employeeId"
          placeholder="Enter Employee ID"
          class="input input-bordered w-full max-w-xs"
        />
        <spr-button
          tone="success"
          @click="fetchEmployeeById"
          :disabled="!employeeId"
          >Fetch Employee</spr-button
        >
      </div>
      <div v-if="isLoading" class="text-center text-gray-500">Loading...</div>
      <div
        v-if="error"
        class="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded"
      >
        Error: {{ error }}
      </div>
      <div
        v-if="employeeData"
        class="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded"
      >
        <h3 class="font-semibold mb-2">Employee Data:</h3>
        <pre class="text-sm whitespace-pre-wrap break-words">{{
          JSON.stringify(employeeData, null, 2)
        }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import apiClient from "../axios";
import { useKeycloakStore } from "../stores/keycloakStore";

const keycloakStore = useKeycloakStore();
const employeeId = ref<number | null>(null);
const employeeData = ref<any>(null); // Use a more specific type if available
const isLoading = ref(false);
const error = ref<string | null>(null);

const displayToken = () => {
  alert(keycloakStore.keycloakApp.instance.token);
  console.log(keycloakStore.keycloakApp.instance.token);
};


const logout = () => {
  keycloakStore.keycloakApp.instance.logout();
};

const fetchEmployeeById = async () => {
  if (!employeeId.value) {
    error.value = "Please enter an Employee ID.";
    return;
  }
  const idAsNumber = Number(employeeId.value);
  if (isNaN(idAsNumber)) {
    error.value = "Employee ID must be a valid number.";
    return;
  }

  isLoading.value = true;
  error.value = null;
  employeeData.value = null;

  try {
    const response = await apiClient.get(`/api/Employees/${idAsNumber}`);
    employeeData.value = response.data;
  } catch (err: any) {
    console.error("Failed to fetch employee data", err);
    error.value =
      err.response?.data?.message ||
      err.message ||
      "Failed to fetch employee data.";
  } finally {
    isLoading.value = false;
  }
};
</script>
