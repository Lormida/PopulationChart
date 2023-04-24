import axios from 'axios'
import { GlobalConstants } from '~/shared/constants'

export const axiosApiPopulationIns = axios.create({
  baseURL: GlobalConstants.VITE_BASE_API_POPULATION_URL,
})
