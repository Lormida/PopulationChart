import type { TNetworkMethod, IResponseError } from '~/shared/types'
import axios, { type AxiosInstance, AxiosError, type AxiosRequestConfig } from 'axios'
import { ref } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useVFetch<D = unknown, P = any>({
  url,
  method,
  apiConfig,
  staticOptions,
}: {
  url: string
  method: TNetworkMethod
  apiConfig: AxiosInstance
  staticOptions?: AxiosRequestConfig
}) {
  return async ({ body, dynamicOptions }: { body?: object; dynamicOptions?: AxiosRequestConfig } = {}) => {
    const responseData = ref<D | null>(null)
    const error = ref<IResponseError | null>(null)
    // TODO:fix - works only for get and post methods
    try {
      if (method === 'get') {
        responseData.value = (await apiConfig.get(url, { ...staticOptions, ...dynamicOptions }))?.data
      } else if (method === 'post' && body) {
        responseData.value = (await apiConfig.post(url, body, { ...staticOptions, ...dynamicOptions }))?.data
      }
    } catch (e: unknown) {
      if (e instanceof AxiosError && e.response) {
        error.value = e.response.data
      } else {
        error.value = {
          message: 'Unexpected server error',
          statusCode: 500,
        }
      }
    }
    return { data: responseData, error }
  }
}

export { useVFetch }
