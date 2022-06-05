<script setup>
import { defineProps, computed } from "vue";
import { formatPrice, calculateDiscountPercentage } from "@/helpers";

const props = defineProps({
  price: {
    type: Object,
    default: () => {},
  },
});

const price = computed(() =>
  props.price.currentPrice
    ? props.price.currentPrice
    : props.price.previousPrice
);

const formattedPrice = computed(() => formatPrice(price.value));
const formattedPriceOld = computed(() =>
  formatPrice(props.price.previousPrice)
);

const discountPercentage = computed(() => {
  if (!props.price.currentPrice) return;
  return calculateDiscountPercentage({
    current: props.price.currentPrice,
    previous: props.price.previousPrice,
  });
});
</script>

<template>
  <div class="price">
    <div v-if="discountPercentage" class="price-discount">
      <p class="price-discount__percentage">
        Save up to {{ discountPercentage }} %
      </p>
      <p class="price-discount__old">{{ formattedPriceOld }}<span> ₽ </span></p>
    </div>
    <p class="price-current">{{ formattedPrice }} <span> ₽ </span></p>
  </div>
</template>
<style lang="scss">
.price {
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  padding: 15px 0;
  &-current {
    color: #00a85a;
    font-size: 24px;
    font-weight: 600;
  }
  &-discount {
    &__old {
      position: relative;
      text-align: right;
      overflow: hidden;
      &::before {
        content: "";
        position: absolute;
        top: 50%;
        width: 100%;
        height: 1px;
        background: #111;
      }
    }
    &__percentage {
      color: red;
    }
  }
}
</style>
