<script setup lang="ts">
import { IPropsChartPopulationRow } from '~/modules/ChartPopulation/types'
import { AtomChartPopulationBodyAmount, AtomChartPopulationBodyCountry, AtomChartPopulationBodyContent } from '../atoms'

const props = defineProps<IPropsChartPopulationRow>()
</script>

<template>
  <li class="chart-population-bodyRow">
    <AtomChartPopulationBodyCountry :country="props.country" class="chart-population-bodyRow__country" />

    <div class="chart-population-bodyRow__content-wrapper">
      <AtomChartPopulationBodyContent :content-data="props.contentData" class="chart-population-bodyRow__content" />
    </div>

    <AtomChartPopulationBodyAmount
      :population-amount="props.populationAmount"
      class="chart-population-bodyRow__amount"
    />
  </li>
</template>

<style lang="scss" scoped>
.chart-population-bodyRow {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  column-gap: 50px;
  margin: 15px auto;
  width: 80%;

  // .chart-population-bodyRow__content-wrapper

  &__content-wrapper {
    width: 100%;
  }

  // .chart-population-bodyRow__content

  &__content {
  }

  // .chart-population-bodyRow__country

  &__country {
    padding: 4px;
    border: 2px solid rgba(22, 22, 22, 0.8);
    border-radius: 15px;
  }

  // .chart-population-bodyRow__amount

  &__amount {
    margin-left: auto;
  }
}
</style>
