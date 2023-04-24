import type { Ref } from 'vue'
import type { useVFetch } from '../composables/network'

export type TNetworkMethod = 'get' | 'post' | 'patch' | 'delete'

export type IResponseError = {
  message: string
  statusCode: number
}
export interface IResponse<D> {
  data: Ref<D | null>
  error: Ref<IResponseError | null>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TNetworkRequest<D = unknown, P = any> = ReturnType<typeof useVFetch<D, P>>
