<script setup lang="ts">
import { MoleculeChartPopulationBodyRow } from '../molecules'
import { Ref, ref } from 'vue'
import { useChartPopulationStore } from '~/modules/ChartPopulation/store'
import { initPopulationStore, updateCountriesPopulationPeriodically } from '~/modules/ChartPopulation/composables'
import { AMOUNT_COUNTRIES, INTERVAL_MILLISECOND_REQUEST } from '~/modules/ChartPopulation/constants'
import { IPropsChartPopulationRow } from '~/modules/ChartPopulation/types'

const chartPopulationStore = useChartPopulationStore()
const dataCountries = ref<IPropsChartPopulationRow[]>() as Ref<IPropsChartPopulationRow[]>
const emit = defineEmits<{
  (e: 'update:currentYear', value: number): void
}>()

function emitCurrentYear(currentYear: number) {
  emit('update:currentYear', currentYear)
}

function updateCurrentYear(dataCountries: Ref<IPropsChartPopulationRow[]>) {
  return (newDataCountries: IPropsChartPopulationRow[]) => {
    dataCountries.value = newDataCountries
  }
}

async function runChart() {
  await initPopulationStore(chartPopulationStore, AMOUNT_COUNTRIES)

  updateCountriesPopulationPeriodically({
    updateDataCountries: updateCurrentYear(dataCountries),
    updateCurrentYear: emitCurrentYear,
    chartPopulationStore,
    howOftenMillisecond: INTERVAL_MILLISECOND_REQUEST,
  })
}

runChart()
</script>

<template>
  <TransitionGroup class="chart-population-body" name="list" tag="ul">
    <template v-if="dataCountries">
      <MoleculeChartPopulationBodyRow
        v-for="dataCountry in dataCountries"
        v-bind="dataCountry"
        :key="dataCountry.country"
      />
    </template>
  </TransitionGroup>
</template>

<style lang="scss" scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease-in-out;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

.list-leave-active {
  position: absolute;
}
</style>
