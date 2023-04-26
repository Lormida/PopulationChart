<script setup lang="ts">
import { AtomChartPopulationHeaderDynamicYear, AtomChartPopulationHeaderLabel } from '../atoms'
const props = defineProps<{
  currentYear?: number
}>()
</script>

<template>
  <div class="chart-population-header">
    <AtomChartPopulationHeaderLabel />
    <AtomChartPopulationHeaderDynamicYear v-if="props.currentYear" :current-year="props.currentYear" />
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
}
</style>
