import type { IRequest } from '@/data/main.interface'
import _ from 'lodash'
import { ACCESS_TOKEN } from '@/constants/global.constants'
import { useAuthStore } from '@/data/auth/auth.store'
import axios, { type AxiosPromise, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import type { App } from 'vue'
import qs from 'qs'
import { useCookies } from '@vueuse/integrations/useCookies'

const prefix = import.meta.env.APP_BASE_URL_PREFIX

const client = axios.create({ baseURL: prefix, headers: { 'Access-Control-Allow-Origin': true } })

function omitOptions(options: IRequest) {
  return _(options)
    .omit(['url', 'type'])
    .omitBy((e) => _.isUndefined(e) || _.isNil(e))
    .value()
}

function parseOptions(options: IRequest | string) {
  if (typeof options === 'string') {
    return { url: options, method: 'get' }
  }
  const { url, method, headers, body, params, isFormData } = options
  const parsedOptions = {
    url,
    data: body,
    method: method || 'get',
    headers,
    params,
  }
  if (isFormData) {
    parsedOptions.data = qs.stringify(parsedOptions.data)
  }
  return parsedOptions
}

export function useApi<T = any>(req: IRequest | string): AxiosPromise<T> {
  const options = parseOptions(req)
  const omited = omitOptions(options)

  return client({
    url: options.url,
    ...omited,
  })
}

export const install = (app: App) => {
  client.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = useCookies().get(ACCESS_TOKEN)
    const lang = document.documentElement.getAttribute('lang')
    config.headers = {
      'Accept-Language': lang || 'en',
    } 
    if (token) {
      config.headers = { ...(config.headers ?? {}), Authorization: `Bearer ${token}` }
    }
    return config
  })

  client.interceptors.response.use(
    (response: AxiosResponse) => {
      return response
    },
    async (error) => {
      const token = useCookies().get(ACCESS_TOKEN)
      if (error.response && (error.response.status === 403 || error.response.status === 401) && token) {
        useCookies().remove(ACCESS_TOKEN)
        await useAuthStore().refreshToken()
        //clean existing auth header

        error.config = _.omit(error.config, 'headers.Authorization')
        return client.request(error.config)
      } else {
        return Promise.reject(error)
      }
    }
  )

  app.provide('axios', client)
  app.provide('useApi', useApi)

  app.config.globalProperties.$api = useApi
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $api: typeof useApi
  }
}

export default install
