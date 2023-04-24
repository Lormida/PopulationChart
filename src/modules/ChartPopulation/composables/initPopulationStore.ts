import { useChartPopulationStore } from '../store'

export async function initPopulationStore(
  chartPopulationStore: ReturnType<typeof useChartPopulationStore>,
  amount: number
) {
  // 1. Load all init information (countries with countryCode + all years)
  await chartPopulationStore.loadInitData()

  // 2. Get data only about 15 countries
  const countriesData = chartPopulationStore.getAllCountriesData({ amount })

  // 3. Select these countries and save their countries codes
  chartPopulationStore.selectCountriesCode(countriesData.map((countryData) => countryData.countryCode))

  return chartPopulationStore
}
