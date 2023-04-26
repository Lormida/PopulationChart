<script setup lang="ts">
const props = defineProps<{
  country: string
}>()
</script>

<template>
  <p class="chart-population-body-row__country">{{ props.country }}</p>
</template>

<style lang="scss" scoped>
.chart-population-body-row {
  // .chart-population-body-row__country

  &__country {
    width: min-content;
    min-width: 200px;
    padding: 4px;
    border: 2px solid rgba(22, 22, 22, 0.8);
    border-radius: 15px;
    font-size: 16px;
    font-weight: 500;
  }
}
</style>
