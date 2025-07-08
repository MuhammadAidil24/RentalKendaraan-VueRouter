import { createApp } from "vue";
import App from "./App.vue";
import router from "./routers/index.js";
import { createPinia } from "pinia";

// Quasar
import { Quasar, Dialog, Notify } from "quasar"; // ✅ tambahkan Notify dan dialog
import quasarIconSet from "quasar/icon-set/material-icons";
import quasarLang from "quasar/lang/id";

// CSS Quasar
import "@quasar/extras/material-icons/material-icons.css";
import "quasar/dist/quasar.css";

const app = createApp(App);

// === PINIA
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);

// ✅ Aktifkan plugin Notify di sini
app.use(Quasar, {
  plugins: {
    Dialog,
    Notify,
  },
  iconSet: quasarIconSet,
  lang: quasarLang,
});

app.use(router);
app.mount("#app");
