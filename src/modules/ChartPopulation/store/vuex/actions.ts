import { ActionContext, ActionTree } from 'vuex'
import { IResponseError } from '~/shared/types'
import { State } from './state'
import { MutationTypes, Mutations } from './mutations'

// Action enums
export enum ActionTypes {
  INIT_STORE = 'INIT_STORE',
  LOAD_CONTRIES_DATA = ' LOAD_CONTRIES_DATA',
  LOAD_YEARS_DATA = 'LOAD_YEARS_DATA',
  LOAD_INIT_DATA = 'LOAD_INIT_DATA',
  LOAD_DATA_BY_COUNTRIES_BY_YEAR = 'LOAD_DATA_BY_COUNTRIES_BY_YEAR',
}

// Actions interface
type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, State>, 'commit'>

export interface Actions {
  [ActionTypes.LOAD_CONTRIES_DATA]({ commit, state }: AugmentedActionContext): void
  [ActionTypes.LOAD_YEARS_DATA]({ commit }: AugmentedActionContext): void
  [ActionTypes.LOAD_INIT_DATA]({ dispatch }: AugmentedActionContext): void
  [ActionTypes.LOAD_DATA_BY_COUNTRIES_BY_YEAR](
    { commit, state }: AugmentedActionContext,
    payload: { countryCodes: string[]; year: number }
  ): void
}

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.LOAD_CONTRIES_DATA]({ commit, state }) {
    try {
      commit(MutationTypes.SET_IS_LOADING, true)

      const { data: countriesData, error: countriesError } = await state.apiPopulation.loadAllCountries()

      if (countriesData.value) {
        commit(MutationTypes.SET_COUNTRIES_DATA, countriesData.value)
      } else {
        commit(MutationTypes.SET_ERROR, countriesError.value as IResponseError)
      }
    } catch (e) {
      commit(MutationTypes.SET_ERROR, { message: (e as Error).message, statusCode: 500 })
    } finally {
      commit(MutationTypes.SET_IS_LOADING, false)
    }
  },
  async [ActionTypes.LOAD_YEARS_DATA]({ commit, state }) {
    try {
      commit(MutationTypes.SET_IS_LOADING, true)

      const { data: yearsData, error: yearsError } = await state.apiPopulation.loadAllYears()

      if (yearsData.value) {
        commit(MutationTypes.SET_YEARS_DATA, yearsData.value)
      } else {
        commit(MutationTypes.SET_ERROR, yearsError.value as IResponseError)
      }
    } catch (e) {
      commit(MutationTypes.SET_ERROR, { message: (e as Error).message, statusCode: 500 })
    } finally {
      commit(MutationTypes.SET_IS_LOADING, false)
    }
  },
  async [ActionTypes.LOAD_INIT_DATA]({ dispatch }) {
    // 1. Load all countries data
    await dispatch(ActionTypes.LOAD_CONTRIES_DATA)

    // 2. Load all years data
    await dispatch(ActionTypes.LOAD_YEARS_DATA)
  },
  async [ActionTypes.LOAD_DATA_BY_COUNTRIES_BY_YEAR]({ commit, state }, { countryCodes, year }) {
    try {
      commit(MutationTypes.SET_IS_LOADING, true)

      const response = await Promise.all(
        countryCodes.map((countryCode) =>
          state.apiPopulation.loadDataByCountryCodeAndYear({
            countryCode,
            year,
          })()
        )
      )

      const dataByCountryCodeAndYear = response.map((el) => el.data?.value && el.data.value[0])

      commit(MutationTypes.SET_DATA_BY_COUNTRY_CODE_AND_YEAR, dataByCountryCodeAndYear)

      return dataByCountryCodeAndYear
    } catch (e) {
      commit(MutationTypes.SET_ERROR, { message: (e as Error).message, statusCode: 500 })
      return []
    } finally {
      commit(MutationTypes.SET_IS_LOADING, false)
    }
  },
}
