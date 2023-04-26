import type { AxiosInstance } from 'axios'
import type { TNetworkRequest } from '~/shared/types'
import { axiosApiPopulationIns } from './apiPopulation.config'
import { useVFetch } from '~/shared/composables/network'
import { GlobalConstants } from '~/shared/constants'
import { IDataCountry, IDataByCountryCodeAndYear } from '../types'

export class _ApiPopulation {
  apiConfig: AxiosInstance
  loadAllCountries: TNetworkRequest<IDataCountry[]>
  loadAllYears: TNetworkRequest<{ year: number }[]>
  loadDataByCountryCodeAndYear: ({
    countryCode,
    year,
  }: {
    countryCode: string
    year: number
  }) => TNetworkRequest<IDataByCountryCodeAndYear[]>

  constructor(apiConfig: AxiosInstance) {
    this.apiConfig = apiConfig

    this.loadAllCountries = useVFetch<IDataCountry[]>({
      url: '/countries',
      method: 'get',
      apiConfig,
      staticOptions: {
        auth: {
          username: 'any-user-name',
          password: GlobalConstants.VITE_API_POPULATION_KEY,
        },
      },
    })

    this.loadAllYears = useVFetch<{ year: number }[]>({
      url: '/years',
      method: 'get',
      apiConfig,
      staticOptions: {
        auth: {
          username: 'any-user-name',
          password: GlobalConstants.VITE_API_POPULATION_KEY,
        },
      },
    })

    this.loadDataByCountryCodeAndYear = ({ countryCode, year }: { countryCode: string; year: number }) =>
      useVFetch<IDataByCountryCodeAndYear[]>({
        url: `/data/${encodeURIComponent(countryCode)}/${encodeURIComponent(year)}/pop`,
        method: 'get',
        apiConfig,
        staticOptions: {
          auth: {
            username: 'any-user-name',
            password: GlobalConstants.VITE_API_POPULATION_KEY,
          },
        },
      })
  }
}

export const ApiPopulation = new _ApiPopulation(axiosApiPopulationIns)
