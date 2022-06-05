<script setup>
import { defineProps, computed } from "vue";
import { convertMeters } from "@/helpers";
import PriceLabel from "@/components/common/PriceLabel";
const props = defineProps({
  hotel: {
    type: Object,
    default: () => {},
  },
});

const hotelImage = computed(() => props.hotel.main_image || null);
const name = computed(
  () => props.hotel?.name || "Не удалось загрузить название отеля"
);
const address = computed(
  () => props.hotel?.address || "Не удалось загрузить адрес отеля"
);
const breakfastIncluded = computed(() => props.hotel?.breakfast);
const distanceToCenter = computed(() =>
  props.hotel.distance_to_center
    ? `${convertMeters(props.hotel?.distance_to_center)} from centre`
    : null
);

const price = computed(() => ({
  currentPrice: props.hotel?.discount_price,
  previousPrice: props.hotel?.price,
}));
</script>

<template>
  <div class="hotel-list-card">
    <div
      class="hotel-list-card__main-image"
      :style="{ backgroundImage: 'url(' + hotelImage + ')' }"
    />
    <div class="hotel-list-card__content">
      <div class="hotel-list-card__header">
        <h3 class="hotel-list-card__title">{{ name }}</h3>
        <div class="hotel-list-card__address">
          <font-awesome-icon icon="location-dot" />
          <p>
            {{ address }} <span>( {{ distanceToCenter }} )</span>
          </p>
        </div>
      </div>
      <div class="hotel-list-card__body">
        <PriceLabel :price="price" />
      </div>
      <div class="hotel-list-card__footer">
        <div
          v-if="breakfastIncluded"
          class="hotel-list-card__breakfast breakfast"
        >
          <font-awesome-icon icon="mug-hot" />
          <p>Breakfast included</p>
        </div>
        <button class="hotel-list-card__button hotel-button">
          See available rooms
        </button>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.hotel-list-card {
  display: grid;
  grid-template-columns: 1fr 2fr;
  margin: 20px 0;
  position: relative;
  border: 1px solid #fafafa;
  box-shadow: 3px 4px 8px 0px rgba(34, 60, 80, 0.09);
  &__main-image {
    padding-top: 65%;
    background-position: center;
    background-size: cover;
  }
}
</style>
