import { createApp } from "vue";
import  App  from "./App.vue";
import { createPinia } from 'pinia';
import router from './router';
import VueProgressBar from "@aacassandra/vue3-progressbar";
import VueSweetalert2 from 'vue-sweetalert2';

import 'sweetalert2/dist/sweetalert2.min.css';
import "@fortawesome/fontawesome-free/scss/fontawesome.scss";
import "@fortawesome/fontawesome-free/scss/brands.scss";
import "@fortawesome/fontawesome-free/scss/regular.scss";
import "@fortawesome/fontawesome-free/scss/solid.scss";
import "@fortawesome/fontawesome-free/scss/v4-shims.scss";

const options = {
    color: "#0d6efd",
    // failedColor: "#874b4b",
    failedColor: "red",
    thickness: "5px",
    transition: {
        speed: "0.2s",
        opacity: "0.6s",
        termination: 300,
    },
    autoRevert: true,
    location: "top",
    inverse: false,
};

createApp(App)
.use(createPinia())
.use(VueSweetalert2)
.use(VueProgressBar, options)
.use(router)
.mount("#app");

import "bootstrap/dist/js/bootstrap.bundle.min.js"