import { useChartPopulationStore } from '../store'
import { IPropsChartPopulationRow } from '../types'
import { reflectDataCountries } from './reflectDataCountries'

export async function loadDataByCountriesByNextYear({
  chartPopulationStore,
  updateDataCountries,
  updateCurrentYear,
  increaseCurrentYear,
  decreaseCurrentYear,
  changeCurrentYear,
  currentYear,
  startYear,
  lastYear,
  howOftenMillisecond,
  timerId,
}: {
  chartPopulationStore: ReturnType<typeof useChartPopulationStore>
  updateDataCountries: (newDataCountries: IPropsChartPopulationRow[]) => void
  updateCurrentYear: (currentYear: number) => void
  increaseCurrentYear: (currentYear: number) => number
  decreaseCurrentYear: (currentYear: number) => number
  changeCurrentYear: (currentYear: number) => number
  currentYear: number
  startYear: number
  lastYear: number
  howOftenMillisecond: number
  timerId?: NodeJS.Timeout
}) {
  // 1. Get list of countries that should be reflected in the chart
  const selectedCountryCodes = chartPopulationStore.getSelectedCountriesCodes

  // 2. Get population information about these countries by current year
  const updatedDataByCountriesByYear = await chartPopulationStore.getDataByCountriesByYear({
    countryCodes: selectedCountryCodes,
    year: currentYear,
  })

  // 3. Reflect (draw) these data in chart
  reflectDataCountries(updateDataCountries, updatedDataByCountriesByYear)

  // 3. Update current year according to the changing logic
  currentYear = changeCurrentYear(currentYear)

  if (currentYear > lastYear) {
    changeCurrentYear = decreaseCurrentYear
    currentYear--
  } else if (currentYear < startYear) {
    changeCurrentYear = increaseCurrentYear
    currentYear++
  }
  // 4. Emit current year to update year label
  updateCurrentYear(currentYear)

  // 5. Repeat the same operation for next year
  timerId = setTimeout(loadDataByCountriesByNextYear, howOftenMillisecond, {
    chartPopulationStore,
    updateDataCountries,
    updateCurrentYear,
    increaseCurrentYear,
    decreaseCurrentYear,
    changeCurrentYear,
    currentYear,
    startYear,
    lastYear,
    howOftenMillisecond,
    timerId,
  }) as unknown as NodeJS.Timeout
}
