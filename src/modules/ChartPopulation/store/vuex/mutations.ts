import { MutationTree } from 'vuex'
import { IResponseError } from '~/shared/types'
import { IDataCountry, IDataByCountryCodeAndYear } from '../../types'
import { State } from './state'

// Mutations enums
export enum MutationTypes {
  SET_COUNTRIES_DATA = 'SET_COUNTRIES_DATA',
  SET_YEARS_DATA = 'SET_YEARS_DATA',
  SET_DATA_BY_COUNTRY_CODE_AND_YEAR = 'SET_DATA_BY_COUNTRY_CODE_AND_YEAR',
  SET_SELECTED_COUNTRIES_CODE = 'SET_SELECTED_COUNTRIES_CODE',
  SET_IS_LOADING = 'SET_IS_LOADING',
  SET_ERROR = 'SET_ERROR',
}

// Mutation Types
export type Mutations<S = State> = {
  [MutationTypes.SET_COUNTRIES_DATA](state: S, payload: IDataCountry[]): void
  [MutationTypes.SET_YEARS_DATA](state: S, payload: { year: number }[]): void
  [MutationTypes.SET_DATA_BY_COUNTRY_CODE_AND_YEAR](state: S, payload: (IDataByCountryCodeAndYear | null)[]): void
  [MutationTypes.SET_SELECTED_COUNTRIES_CODE](state: S, payload: string[]): void
  [MutationTypes.SET_IS_LOADING](state: S, payload: boolean): void
  [MutationTypes.SET_ERROR](state: S, payload: IResponseError): void
}

// Define mutations
export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_COUNTRIES_DATA](state: State, payload: IDataCountry[]) {
    state.countriesData = payload
  },
  [MutationTypes.SET_YEARS_DATA](state: State, payload: { year: number }[]) {
    state.yearsData = payload
  },
  [MutationTypes.SET_DATA_BY_COUNTRY_CODE_AND_YEAR](state: State, payload: (IDataByCountryCodeAndYear | null)[]) {
    state.dataByCountryCodeAndYear = payload
  },
  [MutationTypes.SET_SELECTED_COUNTRIES_CODE](state: State, payload: string[]) {
    state.selectedCountriesCode = payload
  },
  [MutationTypes.SET_IS_LOADING](state: State, payload: boolean) {
    state.isLoading = payload
  },
  [MutationTypes.SET_ERROR](state: State, payload: IResponseError) {
    state.error = payload
  },
}
