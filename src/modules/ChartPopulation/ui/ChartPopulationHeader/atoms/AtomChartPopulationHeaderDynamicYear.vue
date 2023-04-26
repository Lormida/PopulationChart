<script setup lang="ts">
const props = defineProps<{
  currentYear: number
}>()
</script>

<template>
  <h2 class="chart-population-header_dynamic-year">{{ props.currentYear }}</h2>
</template>

<style lang="scss" scoped>
.chart-population-header {
  // .chart-population-header_dynamic-year

  &_dynamic-year {
    color: var(--zinc-700);
    font-size: 50px;
  }
}
</style>
