// src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/HomeView.vue";
import About from "../views/AboutView.vue";
import { useKeycloakStore } from "../stores/keycloakStore";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, _from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const keycloakStore = useKeycloakStore();
    if (keycloakStore.isAuthenticated ) {
      console.log("authenticated");
      next();
    } else {
      keycloakStore.keycloakApp.instance.login();
    }
  } else {
    next();
  }
});

export default router;
