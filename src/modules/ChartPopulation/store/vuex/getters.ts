import { GetterTree } from 'vuex'
import { IDataByCountryCodeAndYear, IDataCountry } from '../../types'
import { State } from './state'

// Getters types
export type Getters = {
  getLastYear(state: State): number | undefined
  getStartYear(state: State): number | undefined
  getIsLoading(state: State): boolean
  getSelectedCountriesCodes(state: State): string[]
  getDataByCountryCodeAndYear(state: State): (IDataByCountryCodeAndYear | null)[]
  getAllCountriesData(state: State): ({ amount }: { amount: number }) => IDataCountry[]
}

//getters

export const getters: GetterTree<State, State> & Getters = {
  getLastYear: (state) => state.yearsData[0]?.year,
  getStartYear: (state) => state.yearsData.at(-1)?.year,
  getIsLoading: (state) => state.isLoading,
  getSelectedCountriesCodes: (state) => state.selectedCountriesCode,
  getDataByCountryCodeAndYear: (state) => state.dataByCountryCodeAndYear,
  getAllCountriesData:
    (state) =>
    ({ amount }) =>
      state.countriesData.slice(0, amount),
}
