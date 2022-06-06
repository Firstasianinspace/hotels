<script setup>
import { computed, onMounted } from "vue";
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
  store.dispatch("fetchSortFilters");
});

const hotels = computed(() => store.getters.sortedHotels);
</script>
<template>
  <div class="about">
    <h1>This is an Hotels page</h1>
    <HotelSort />
    <HotelsLayout>
      <component
        :is="hotelCardComponent"
        v-for="hotel in hotels"
        :key="hotel.id"
        :hotel="hotel"
      />
    </HotelsLayout>
  </div>
</template>
