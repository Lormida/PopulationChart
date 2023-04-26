import { defineStore } from 'pinia'
import { IResponseError } from '~/shared/types'
import { useState } from './state'

export const useActions = defineStore('chartPopulation.actions', () => {
  const state = useState()

  async function loadContriesData() {
    try {
      setLoading(true)

      const { data: countriesData, error: countriesError } = await state.apiPopulation.loadAllCountries()

      if (countriesData.value) {
        state.countriesData = countriesData.value
      } else {
        setError(countriesError.value as IResponseError)
      }
    } catch (e) {
      setError({ message: (e as Error).message, statusCode: 500 })
    } finally {
      setLoading(false)
    }
  }

  async function loadYearsData() {
    try {
      setLoading(true)

      const { data: yearsData, error: yearsError } = await state.apiPopulation.loadAllYears()

      if (yearsData.value) {
        state.yearsData = yearsData.value
      } else {
        setError(yearsError.value as IResponseError)
      }
    } catch (e) {
      setError({ message: (e as Error).message, statusCode: 500 })
    } finally {
      setLoading(false)
    }
  }

  async function loadInitData() {
    // 1. Load all countries data
    await loadContriesData()

    // 2. Load all years data
    await loadYearsData()
  }

  async function loadDataByCountriesByYear({ countryCodes, year }: { countryCodes: string[]; year: number }) {
    try {
      const response = await Promise.all(
        countryCodes.map((countryCode) =>
          state.apiPopulation.loadDataByCountryCodeAndYear({
            countryCode,
            year,
          })()
        )
      )
      return response.map((el) => el.data?.value && el.data.value[0])
    } catch (e) {
      setError({ message: (e as Error).message, statusCode: 500 })
      return []
    }
  }

  function selectCountriesCode(countryCodes: string[]) {
    state.selectedCountriesCode = countryCodes
  }

  function setLoading(status: boolean) {
    state.isLoading = status
  }

  function setError(error: IResponseError) {
    state.error = error
  }

  return {
    loadContriesData,
    loadYearsData,
    loadInitData,
    loadDataByCountriesByYear,
    selectCountriesCode,
    setLoading,
    setError,
  }
})
