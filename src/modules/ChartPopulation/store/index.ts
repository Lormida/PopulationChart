import { defineStore } from 'pinia'
import { IResponseError } from '~/shared/types'
import { ApiPopulation } from '../api'
import { IDataCountry, IDataByCountryCodeAndYear } from '../types'

export const useChartPopulationStore = defineStore('chart-population', {
  state: () => ({
    countriesData: [] as IDataCountry[],
    yearsData: [] as { year: number }[],
    dataByCountryCodeAndYear: [] as IDataByCountryCodeAndYear[],
    selectedCountriesCode: [] as string[],
    isLoading: false,
    error: null as null | IResponseError,
    apiPopulation: ApiPopulation,
  }),
  getters: {
    getLastYear: (state) => state.yearsData[0]?.year,
    getStartYear: (state) => state.yearsData.at(-1)?.year as number,
    getIsLoading: (state) => state.isLoading,
    getSelectedCountriesCodes: (state) => state.selectedCountriesCode,
    getAllCountriesData:
      (state) =>
      ({ amount }: { amount: number }) =>
        state.countriesData.slice(0, amount),
  },
  actions: {
    async loadContriesData() {
      try {
        this.setLoading(true)

        const { data: countriesData, error: countriesError } = await this.apiPopulation.loadAllCountries()

        if (countriesData.value) {
          this.countriesData = countriesData.value
        } else {
          this.setError(countriesError.value as IResponseError)
        }
      } catch (e) {
        this.setError({ message: (e as Error).message, statusCode: 500 })
      } finally {
        this.setLoading(false)
      }
    },
    async loadYearsData() {
      try {
        this.setLoading(true)

        const { data: yearsData, error: yearsError } = await this.apiPopulation.loadAllYears()

        if (yearsData.value) {
          this.yearsData = yearsData.value
        } else {
          this.setError(yearsError.value as IResponseError)
        }
      } catch (e) {
        this.setError({ message: (e as Error).message, statusCode: 500 })
      } finally {
        this.setLoading(false)
      }
    },
    async loadInitData() {
      // 1. Load all countries data
      await this.loadContriesData()

      // 2. Load all years data
      await this.loadYearsData()
    },
    async getDataByCountriesByYear({ countryCodes, year }: { countryCodes: string[]; year: number }) {
      try {
        const response = await Promise.all(
          countryCodes.map((countryCode) =>
            this.apiPopulation.loadDataByCountryCodeAndYear({
              countryCode,
              year,
            })()
          )
        )
        return response.map((el) => el.data?.value && el.data.value[0])
      } catch (e) {
        this.setError({ message: (e as Error).message, statusCode: 500 })
        return []
      }
    },

    selectCountriesCode(countryCodes: string[]) {
      this.$state.selectedCountriesCode = countryCodes
    },
    setLoading(status: boolean) {
      this.$state.isLoading = status
    },
    setError(error: IResponseError) {
      this.$state.error = error
    },
  },
})
