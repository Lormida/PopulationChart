import { computed } from 'vue'
import { useState } from './state'
import { defineStore } from 'pinia'

export const useGetters = defineStore('chartPopulation.getters', () => {
  const state = useState()

  const getLastYear = computed(() => state.yearsData[0]?.year)
  const getStartYear = computed(() => state.yearsData.at(-1)?.year as number)
  const getIsLoading = computed(() => state.isLoading)
  const getSelectedCountriesCodes = computed(() => state.selectedCountriesCode)
  const getAllCountriesData = ({ amount }: { amount: number }) => computed(() => state.countriesData.slice(0, amount))

  return {
    getLastYear,
    getStartYear,
    getIsLoading,
    getSelectedCountriesCodes,
    getAllCountriesData,
  }
})
