import { ActionTypes } from '../store/vuex/actions'
import { MutationTypes } from '../store/vuex/mutations'
import { Store } from '../store/vuex/state'

export async function initializePopulationStore(chartPopulationStore: Store, amount: number) {
  // 1. Load all init information (countries with countryCode + all years)
  await chartPopulationStore.dispatch(ActionTypes.LOAD_INIT_DATA)

  // 2. Get data only about 15 countries
  const countriesData = chartPopulationStore.getters.getAllCountriesData({ amount })

  // 3. Select these countries and save their countries codes
  chartPopulationStore.commit(
    MutationTypes.SET_SELECTED_COUNTRIES_CODE,
    countriesData.map((countryData) => countryData.countryCode)
  )

  return chartPopulationStore
}
