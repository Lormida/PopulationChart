import { Store } from '../store/vuex/state'
import { IPropsChartPopulationRow } from '../types/propsChartPopulationRow.type'
import { loadDataByCountriesByNextYear } from './loadDataByCountriesByNextYear'

export async function updateCountriesPopulationPeriodically({
  chartPopulationStore,
  updateDataCountries,
  updateCurrentYear,
  howOftenMillisecond,
}: {
  chartPopulationStore: Store
  updateDataCountries: (newDataCountries: IPropsChartPopulationRow[]) => void
  updateCurrentYear: (currentYear: number) => void
  howOftenMillisecond: number
}) {
  const timerId = setTimeout(loadDataByCountriesByNextYear, howOftenMillisecond, {
    chartPopulationStore,
    updateDataCountries,
    updateCurrentYear,
    increaseCurrentYear: (currentYear: number) => currentYear + 1,
    decreaseCurrentYear: (currentYear: number) => currentYear - 1,
    changeCurrentYear: (currentYear: number) => currentYear + 1,
    currentYear: chartPopulationStore.getters.getStartYear,
    startYear: chartPopulationStore.getters.getStartYear,
    lastYear: chartPopulationStore.getters.getLastYear,
    howOftenMillisecond,
  })
}
