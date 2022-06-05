import axios from "axios";
import { setField } from "./helpers";

const hotels = {
  state: () => ({
    loading: false,
    allHotels: [],
  }),
  mutations: {
    setField,
  },
  actions: {
    async fetchHotels({ commit }) {
      try {
        commit("setField", { field: "loading", value: true });
        await axios
          .get("https://api.jsonbin.io/b/629b830a402a5b38021c6c29/7")
          .then((response) => {
            commit("setField", { field: "allHotels", value: response.data });
          });
      } catch (e) {
        console.log(e);
      } finally {
        commit("setField", { field: "loading", value: false });
      }
    },
  },
  getters: {
    hotelsLoading: ({ loading }) => loading,
    allHotels: ({ allHotels }) => allHotels,
    totalHotels: ({ allHotels }) => allHotels.length || null,
  },
};

export default hotels;
