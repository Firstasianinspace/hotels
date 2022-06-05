<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useHotelsLayout } from "@/composable/useHotelsLayout";

const { layout, setLayout, LAYOUTS } = useHotelsLayout();

const dynamicIcon = ref(["fa", "list"]);
const toggleLayout = () => {
  if (LAYOUTS.grid === layout.value) {
    dynamicIcon.value = ["fa", "border-all"];
    setLayout(LAYOUTS.list);
  } else if (LAYOUTS.list === layout.value) {
    dynamicIcon.value = ["fa", "list"];
    setLayout(LAYOUTS.grid);
  }
};

const store = useStore();

const totalFound = computed(() => store.getters.totalHotels);
</script>
<template>
  <div class="hotel-sort">
    <p>{{ totalFound }} properties found</p>
    <button class="hotel-sort_toggle-layout" @click="toggleLayout">
      <font-awesome-icon :icon="dynamicIcon" size="lg" />
    </button>
  </div>
</template>
<style lang="scss">
.hotel-sort {
  display: flex;
  justify-content: space-between;

  &_toggle-layout {
    border: none;
    background: none;
    cursor: pointer;
  }
}
</style>
