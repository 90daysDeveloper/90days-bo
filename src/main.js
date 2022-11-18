import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import axios from "axios";

import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "/node_modules/primeflex/primeflex.css";

import "./assets/scss/style.scss";

axios.defaults.baseURL = process.env.VUE_APP_API_BASE;
axios.defaults.headers.common[
  "Authorization"
] = `Bearer ${process.env.VUE_APP_BEARER_DIRECTUS}`;

import PrimeVueConfigurator from "./utils/PrimeVueConfigurator";

const pinia = createPinia();
const app = createApp(App);

PrimeVueConfigurator.init(app);
app.use(pinia);
app.use(router);

app.mount("#app");
