<script setup>
import { defineProps, defineEmits, ref, computed, useAttrs } from "vue";

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  itemText: {
    type: String,
  },
  itemValue: {
    type: String,
  },
});

const isOpen = ref(false);
const isFocused = ref(false);

const emit = defineEmits(["setOption"]);
const attrs = useAttrs();

const value = computed(() => {
  const item = props.items.find((s) => s.name);
  return item ? item.name : attrs.value;
});

const className = computed(() => {
  const classNames = ["custom-select custom-select--select"];
  isOpen.value && classNames.push("is-open");
  (isOpen.value || isFocused.value) && classNames.push("is-focused");
  return classNames;
});

const onSelect = (item) => {
  isOpen.value = false;
  emit("setOption", item?.name || item);
};
</script>
<template>
  <div
    :class="className"
    @mouseover="isFocused = true"
    @mouseleave="isFocused = false"
  >
    <div @click="isOpen = !isOpen" class="custom-select__caption">
      {{ value }}
    </div>
    <div class="custom-select__options">
      <template v-if="items.length">
        <div
          v-for="(item, i) in items"
          :key="i"
          @click="onSelect(item)"
          v-text="item.name"
          class="custom-select__item"
        />
      </template>
      <div
        v-else
        class="custom-select__item custom-select__item--disabled"
      ></div>
    </div>
  </div>
</template>
<style lang="scss">
.custom-select {
  position: relative;
  padding: 10px 0 0;
  &.is-open &__caption::after {
    border: 5px solid transparent;
    border-top: none;
  }
  &.is-open &__options {
    display: block;
  }
  &__item {
    position: relative;
    padding: 10px 32px 10px 17px;
    cursor: pointer;
    &--disabled {
      pointer-events: none;
      cursor: not-allowed;
      opacity: 0.5;
    }
    &:hover {
      color: black;
    }
  }
  &__options {
    position: absolute;
    top: 57px;
    right: 0;
    left: 0;
    z-index: 6;
    display: none;
    max-height: 190px;
    padding: 5px 0;
    overflow: auto;
    background: #fff;
    border: 1px solid grey;
  }

  &__caption {
    position: relative;
    display: flex;
    align-items: center;
    width: 200px;
    height: 48px;
    padding: 0 32px 0 17px;
    margin-bottom: 6px;
    overflow: hidden;
    font-weight: normal;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
    border: 1px solid grey;
    border-radius: 2px;
    &::after {
      position: absolute;
      top: 21px;
      right: 19px;
      content: "";
      border: 5px solid transparent;
      border-bottom: none;
    }
    &.error {
      border-color: red;
    }
    .is-focused > & {
      border: 1px solid black;
      transition: all 0.2s;
    }
  }
  &__error {
    padding-left: 1px;
    color: red;
  }
}
</style>
