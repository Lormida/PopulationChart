<script setup lang="ts">
import { IPropsChartPopulationRow } from '~/modules/ChartPopulation/types'
import { AtomChartPopulationBodyAmount, AtomChartPopulationBodyCountry, AtomChartPopulationBodyContent } from '../atoms'

const props = defineProps<IPropsChartPopulationRow>()
</script>

<template>
  <li class="chart-population-body-row">
    <AtomChartPopulationBodyCountry :country="props.country" />

    <div class="chart-population-body-row__content-wrapper">
      <AtomChartPopulationBodyContent :content-data="props.contentData" />
    </div>

    <AtomChartPopulationBodyAmount :population-amount="props.populationAmount" />
  </li>
</template>

<style lang="scss" scoped>
.chart-population-body-row {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  column-gap: 50px;
  margin: 15px auto;
  width: 80%;

  // .chart-population-body-row__content-wrapper

  &__content-wrapper {
    width: 100%;
  }
}
</style>
