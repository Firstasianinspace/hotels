<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import HotelsLayout from "@/layouts/HotelsLayout";
import { useHotelsLayout } from "@/composable/useHotelsLayout";
import HotelGridCard from "@/components/hotels/HotelGridCard";
import HotelListCard from "@/components/hotels/HotelListCard";
import HotelSort from "@/components/hotels/HotelSort";

const { layout, LAYOUTS } = useHotelsLayout();

const hotelLayoutComponent = {
  [LAYOUTS.grid]: HotelGridCard,
  [LAYOUTS.list]: HotelListCard,
};

const hotelCardComponent = computed(() => hotelLayoutComponent[layout.value]);

const store = useStore();

onMounted(() => {
  store.dispatch("fetchHotels");
});

const sortFilter = ref("ascending");

const filteredHotels = computed(() => {
  const hotels = store.getters.allHotels;
  if (sortFilter.value === "ascending") {
    return hotels.sort((a, b) => a.name.localeCompare(b.name));
  }
  if (sortFilter.value === "descending") {
    return hotels.sort((a, b) => -1 * a.name.localeCompare(b.name));
  }
  return hotels;
});

const toggleSort = () => {
  sortFilter.value = "descending";
};
</script>
<template>
  <div class="about">
    <h1>This is an Hotels page</h1>
    <HotelSort />
    <button @click="toggleSort">Test</button>
    <HotelsLayout>
      <component
        :is="hotelCardComponent"
        v-for="hotel in filteredHotels"
        :key="hotel.id"
        :hotel="hotel"
      />
    </HotelsLayout>
  </div>
</template>
