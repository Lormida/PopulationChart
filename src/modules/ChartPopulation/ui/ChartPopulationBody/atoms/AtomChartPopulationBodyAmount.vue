<script setup lang="ts">
const props = defineProps<{
  populationAmount: number
}>()
</script>

<template>
  <p class="chart-population-body-row__amount">{{ props.populationAmount }}</p>
</template>

<style lang="scss" scoped>
.chart-population-body-row {
  // .chart-population-body-row__amount

  &__amount {
    margin-left: auto;
  }
}
</style>
