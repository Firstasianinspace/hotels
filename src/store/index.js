import { createStore } from "vuex";
import hotels from "./hotels.js";

export default createStore({
  modules: {
    hotels,
  },
});
