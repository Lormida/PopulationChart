<script setup lang="ts">
import { AtomChartPopulationHeaderDynamicYear, AtomChartPopulationHeaderLabel } from '../atoms'
const props = defineProps<{
  currentYear: number
}>()
</script>

<template>
  <div class="chart-population-header">
    <AtomChartPopulationHeaderLabel class="chart-population-header_label" />
    <AtomChartPopulationHeaderDynamicYear
      :current-year="props.currentYear"
      class="chart-population-header_dynamic-year"
    />
  </div>
</template>

<style lang="scss" scoped>
.chart-population-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 50px;
  padding: 20px 0;
  background-color: rgba(22, 22, 22, 0.1);

  // .chart-population-header_label

  &_label {
    font-size: 60px;
    font-weight: 900;
  }

  // .chart-population-header_dynamic-year

  &_dynamic-year {
    color: var(--zinc-700);
    font-size: 50px;
  }
}
</style>
