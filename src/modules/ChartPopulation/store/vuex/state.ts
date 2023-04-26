import { IResponseError } from '~/shared/types'
import { _ApiPopulation, ApiPopulation } from '../../api'
import { IDataCountry, IDataByCountryCodeAndYear } from '../../types'
import { Mutations } from './mutations'
import { Actions } from './actions'
import { Getters } from './getters'
import { Store as VuexStore, CommitOptions, DispatchOptions } from 'vuex'

//declare state
export type State = {
  countriesData: IDataCountry[]
  yearsData: { year: number }[]
  dataByCountryCodeAndYear: (IDataByCountryCodeAndYear | null)[]
  selectedCountriesCode: string[]
  isLoading: boolean
  error: null | IResponseError
  apiPopulation: _ApiPopulation
}

//setup store type
export type Store = Omit<VuexStore<State>, 'commit' | 'getters' | 'dispatch'> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>
  }
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>
}

//set state
export const state: State = {
  countriesData: [] as IDataCountry[],
  yearsData: [] as { year: number }[],
  dataByCountryCodeAndYear: [] as (IDataByCountryCodeAndYear | null)[],
  selectedCountriesCode: [] as string[],
  isLoading: false,
  error: null as null | IResponseError,
  apiPopulation: ApiPopulation,
}
