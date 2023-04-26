import { createLogger, createStore } from 'vuex'
import { mutations } from './mutations'
import { Store, state } from './state'
import { actions } from './actions'
import { getters } from './getters'

export const store = createStore({
  state,
  mutations,
  actions,
  getters,
  plugins: [createLogger()],
})

export function useStore() {
  return store as Store
}
