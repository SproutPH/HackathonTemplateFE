import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import SproutDesignSystem from 'design-system-next'; 

import 'design-system-next/style.css'; 
import "./assets/main.css";

console.log(import.meta.env.VITE_API_URL);

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.use(SproutDesignSystem);
app.mount("#app");
