import type { FetchEventSourceInit } from '@microsoft/fetch-event-source'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults, InternalAxiosRequestConfig } from 'axios'
import { fetchEventSource } from '@microsoft/fetch-event-source'
import axios from 'axios'

export type AxiosRequestFnWrap<T = any> = [() => Promise<T>, AbortController]

export interface RequestInterceptorConfig {
  fulfilled?: (
    config: InternalAxiosRequestConfig,
  ) =>
    | InternalAxiosRequestConfig<any>
    | Promise<InternalAxiosRequestConfig<any>>
  rejected?: (error: any) => any
}

export interface ResponseInterceptorConfig<T = any> {
  fulfilled?: (
    response: AxiosResponse<T>,
  ) => AxiosResponse | Promise<AxiosResponse>
  rejected?: (error: any) => any
}

export class Request {
  public instance: AxiosInstance

  constructor(options: CreateAxiosDefaults = {}) {
    this.instance = axios.create(
      merge(
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          timeout: 30 * 1000,
        },
        options,
      ),
    )
  }

  addRequestInterceptor({ fulfilled, rejected }: RequestInterceptorConfig) {
    this.instance.interceptors.request.use(fulfilled, rejected)
  }

  addResponseInterceptor<T = any>({ fulfilled, rejected }: ResponseInterceptorConfig<T>) {
    this.instance.interceptors.response.use(fulfilled, rejected)
  }

  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosRequestFnWrap<T> {
    return this.$axios<T>(url, { ...config, method: 'DELETE' })
  }

  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosRequestFnWrap<T> {
    return this.$axios<T>(url, { ...config, method: 'GET' })
  }

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosRequestFnWrap<T> {
    return this.$axios<T>(url, { ...config, data, method: 'POST' })
  }

  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosRequestFnWrap<T> {
    return this.$axios<T>(url, { ...config, data, method: 'PUT' })
  }

  upload<T>(url: string, data: { file: Blob | File } & Record<string, any>, config?: AxiosRequestConfig): AxiosRequestFnWrap<T> {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value)
    })
    const requestConfig: AxiosRequestConfig = {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...config?.headers,
      },
    }
    return this.$axios(url, { ...requestConfig, data: formData })
  }

  download(url: string, config?: AxiosRequestConfig): AxiosRequestFnWrap<Blob> {
    const requestConfig: AxiosRequestConfig = {
      ...config,
      responseType: 'blob',
    }
    return this.$axios(url, requestConfig)
  }

  $axios<T>(url: string, config: AxiosRequestConfig): AxiosRequestFnWrap<T> {
    try {
      const controller = new AbortController()
      const fetcher = async () => {
        const response = await this.instance({
          url,
          signal: controller.signal,
          ...config,
        })
        return response as T
      }
      return [fetcher, controller]
    }
    catch (error: any) {
      throw error.response ? error.response.data : error
    }
  }

  eventSource(url: string, options: FetchEventSourceInit): AbortController {
    const controller = new AbortController()
    fetchEventSource(url, {
      ...options,
      signal: controller.signal,
    })
    return controller
  }
}

export const request = new Request()
