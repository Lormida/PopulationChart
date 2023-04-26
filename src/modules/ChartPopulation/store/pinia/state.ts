import { IResponseError } from '~/shared/types'
import { ApiPopulation, _ApiPopulation } from '../../api'
import { IDataCountry, IDataByCountryCodeAndYear } from '../../types'
import { defineStore } from 'pinia'

export interface State {
  countriesData: IDataCountry[]
  yearsData: { year: number }[]
  dataByCountryCodeAndYear: IDataByCountryCodeAndYear[]
  selectedCountriesCode: string[]
  isLoading: boolean
  error: null | IResponseError
  apiPopulation: _ApiPopulation
}

export const useState = defineStore({
  id: 'chartPopulation.state',

  state: (): State => ({
    countriesData: [],
    yearsData: [],
    dataByCountryCodeAndYear: [],
    selectedCountriesCode: [],
    isLoading: false,
    error: null,
    apiPopulation: ApiPopulation,
  }),
})
