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
  <div class="hotel-grid-card">
    <div
      class="hotel-grid-card__main-image"
      :style="{ backgroundImage: 'url(' + hotelImage + ')' }"
    />
    <div class="hotel-grid-card__content">
      <div class="hotel-grid-card__header">
        <h3 class="hotel-grid-card__title">{{ name }}</h3>
        <div class="hotel-grid-card__address">
          <font-awesome-icon icon="location-dot" />
          <p>
            {{ address }} <span>( {{ distanceToCenter }} )</span>
          </p>
        </div>
      </div>
      <div class="hotel-grid-card__body">
        <PriceLabel :price="price" />
      </div>
      <div class="hotel-grid-card__footer">
        <div
          v-if="breakfastIncluded"
          class="hotel-grid-card__breakfast breakfast"
        >
          <font-awesome-icon icon="mug-hot" />
          <p>Breakfast included</p>
        </div>
        <button class="hotel-grid-card__button hotel-button">
          See available rooms
        </button>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.hotel-grid-card {
  display: flex;
  flex-direction: column;
  position: relative;
  border: 1px solid #fafafa;
  box-shadow: 3px 4px 8px 0px rgba(34, 60, 80, 0.09);
  transition: all 0.3s ease-in;
  &:hover {
    box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.22);
  }
  &__main-image {
    padding-top: 65%;
    background-position: center;
    background-size: cover;
  }
  &__content {
    height: 100%;
    padding: 15px;
    display: grid;
    grid-template-rows: auto 2fr 1fr;
  }
  &__header {
  }
  &__title {
    font-size: 20px;
    font-weight: 700;
  }
  &__address {
    display: flex;
    align-items: center;
    gap: 10px;
    & p {
      font-size: 12px;
    }
  }
  &__body {
    align-self: flex-end;
  }
  &__footer {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  &__breakfast {
    grid-column: 1 / 1;
  }
  &__button {
    grid-column: 2 / 2;
  }
}

.breakfast {
  color: #00a85a;
  display: flex;
  align-items: center;
  gap: 15px;
}

.hotel-button {
  border: none;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  background: #008be0;
  padding: 7.5px 10px;
  cursor: pointer;
}
</style>
