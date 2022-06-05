<template>
  <figure :class="{ 'is-loading': !isLoaded }" class="custom-image">
    <img
      ref="image"
      v-lazyload
      v-bind="$attrs"
      :data-url="srcInner"
      @load="isLoaded = true"
      @error="onError"
      :class="{ transparent: !isLoaded }"
      class="custom-image__image"
    />
    <div
      v-if="!isLoaded"
      v-loading="true"
      :style="loaderStyle"
      class="loader"
    />
  </figure>
</template>

<script>
export const NOIMAGE_URL = "/img/noimage.png";

export default {
  name: "CustomImage",
  inheritAttrs: false,
  props: {
    src: String,
    defaultSrc: {
      type: String,
      default: NOIMAGE_URL,
    },
    loaderColor: {
      type: String,
      default: "#008895",
    },
  },
  data() {
    return {
      srcInner: null,
      isLoaded: false,
    };
  },
  computed: {
    loaderStyle() {
      const { loaderColor } = this;

      return {
        stroke: loaderColor,
      };
    },
  },
  watch: {
    src: {
      immediate: true,
      handler() {
        this.srcInner = this.url || this.defaultSrc;
      },
    },
  },
  methods: {
    onError() {
      if (this.srcInner === this.defaultSrc) return;
      this.srcInner = this.defaultSrc;
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-image {
  width: 100%;

  &.is-loading {
    height: 100%;
  }

  &__image {
    max-width: 100%;
    object-fit: contain;
  }

  .loader {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex: 1;
    justify-content: center;
    height: 100%;
    margin: auto;
  }

  .transparent {
    opacity: 0;
  }
}
</style>
