<script setup>
import { computed } from "vue";
import GridLayout from "@/layouts/components/GridLayout";
import ListLayout from "@/layouts/components/ListLayout";

import { useHotelsLayout, LAYOUTS } from "@/composable/useHotelsLayout";

const layoutComponents = {
  [LAYOUTS.grid]: GridLayout,
  [LAYOUTS.list]: ListLayout,
};

const { layout } = useHotelsLayout();

const currentLayoutComponent = computed(() => layoutComponents[layout.value]);
</script>
<template>
  <component :is="currentLayoutComponent">
    <template
      v-for="slotName in Object.keys($slots)"
      :key="slotName"
      v-slot:[slotName]="slotProps"
    >
      <slot :name="slotName" :layout="layout" v-bind="slotProps" />
    </template>
  </component>
</template>
<style lang="scss"></style>
