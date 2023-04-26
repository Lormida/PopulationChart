import { defineStore } from 'pinia'
import { useActions } from './actions'
import { useGetters } from './getters'
import { useState } from './state'
import { extractStore } from './extractStore'

export const useChartPopulationStore = defineStore('chartPopulation', () => ({
  ...extractStore(useState()),
  ...extractStore(useGetters()),
  ...extractStore(useActions()),
}))
