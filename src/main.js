import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import FontAwesomeIcon from "@/utilities/fontawesome";

createApp(App)
  .use(store)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
