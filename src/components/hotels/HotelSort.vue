<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useHotelsLayout } from "@/composable/useHotelsLayout";
import CustomSelect from "@/components/common/CustomSelect";

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
const sortOptions = computed(() => store.getters.sortFilters);

const setSortOption = (item) => {
  store.dispatch("setSortFilter", item);
};
</script>
<template>
  <div class="hotel-sort">
    <p>{{ totalFound }} properties found</p>
    <div class="hotel-sort__select">
      <CustomSelect
        :items="sortOptions"
        item-text="value"
        item-value="value"
        @setOption="setSortOption"
      />
    </div>
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
