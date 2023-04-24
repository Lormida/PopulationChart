<script setup lang="ts">
import { TemplateChartPopulation } from './template'
import { MoleculeChartPopulationHeader } from './ChartPopulationHeader'
import { OrganismChartPopulation } from './ChartPopulationBody'
import { ref } from 'vue'

const currentYear = ref<number>()

function updateCurrentYear(newCurrentYear: number) {
  currentYear.value = newCurrentYear
}
</script>

<template>
  <TemplateChartPopulation>
    <template #chart-population-header>
      <MoleculeChartPopulationHeader v-if="currentYear" :current-year="currentYear" />
    </template>

    <template #chart-population-body>
      <OrganismChartPopulation @update:current-year="updateCurrentYear" />
    </template>
  </TemplateChartPopulation>
</template>

<style lang="scss" scoped></style>
