import { createApp } from "vue";
import  App  from "./App.vue";
import { createPinia } from 'pinia'
import router from './router'
import "@fortawesome/fontawesome-free/scss/fontawesome.scss";
import "@fortawesome/fontawesome-free/scss/brands.scss";
import "@fortawesome/fontawesome-free/scss/regular.scss";
import "@fortawesome/fontawesome-free/scss/solid.scss";
import "@fortawesome/fontawesome-free/scss/v4-shims.scss";

createApp(App)
.use(createPinia())
.use(router)
.mount("#app");

import "bootstrap/dist/js/bootstrap.bundle.min.js"