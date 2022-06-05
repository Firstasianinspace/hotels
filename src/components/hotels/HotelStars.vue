<script setup>
import { defineProps } from "vue";

const props = defineProps({
  stars: {
    type: Number,
    default: 0,
  },
});
</script>
<template>
  <div class="hotel-stars"></div>
</template>
<style lang="scss"></style>
