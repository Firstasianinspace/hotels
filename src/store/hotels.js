import axios from "axios";
import { setField } from "./helpers";

const hotels = {
  state: () => ({
    loading: false,
    allHotels: [],
    sortFilters: [],
    activeFilter: "ascending",
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
        // Нету обработчика ошибок
        console.log(e);
      } finally {
        commit("setField", { field: "loading", value: false });
      }
    },
    async fetchSortFilters({ commit }) {
      try {
        await axios
          .get("https://api.jsonbin.io/b/629e51d3449a1f3821ffb891/2")
          .then((response) => {
            commit("setField", { field: "sortFilters", value: response.data });
          });
      } catch (e) {
        console.log(e);
      }
    },
    setSortFilter({ commit }, payload) {
      if (!payload) return null;
      commit("setField", { field: "activeFilter", value: payload });
    },
  },
  getters: {
    hotelsLoading: ({ loading }) => loading,
    allHotels: ({ allHotels }) => allHotels,
    totalHotels: ({ allHotels }) => allHotels.length || null,
    sortFilters: ({ sortFilters }) => sortFilters,
    activeFilter: ({ activeFilter }) => activeFilter,
    sortedHotels: ({ allHotels, activeFilter }) => {
      if (activeFilter === "ascending") {
        return allHotels.sort((a, b) => a.name.localeCompare(b.name));
      }
      if (activeFilter === "descending") {
        return allHotels.sort((a, b) => -1 * a.name.localeCompare(b.name));
      }
      return allHotels;
    },
  },
};

export default hotels;
