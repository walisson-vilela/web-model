import Axios, { AxiosRequestConfig } from 'axios'
import { Cookies } from 'react-cookie'

import { TABS_CACHE_KEY } from '../../routes/constants'
import { Logout } from '../../utils/Auth'
import { isObject } from '../../utils/Validators'

const isAxiosRequestConfig = (
  config: unknown,
): config is AxiosRequestConfig => {
  return (
    isObject(config) &&
    typeof config['url'] === 'string' &&
    typeof config['baseURL'] === 'string'
  )
}

const actions = {
  token: 'v1/users/token',
  renew: 'v1/users/token',
  subdomain: 'v1/accounts/check-subdomain',
}

const checkAction = (actions: string[], action: string): boolean => {
  return actions.some((e) => action.startsWith(e))
}

const axios = Axios.create({
  baseURL: ((hostname: string) => {

    if (hostname.endsWith('traderesult.app')) {
      return 'https://api-tr.traderesult.app'
    }

    if (hostname.endsWith('traderesult.ninja')) {
      return 'https://apimw.sistemagiv.com.br'
    }

    return 'https://apimw.sistemagiv.com.br'

  })(window.location.hostname),

  headers: {
    common: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Accept-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
      'Accept-Language': localStorage.getItem('_GIV_LOCALE') || 'pt-br',
    },
  },
})

axios.interceptors.request.use(
  (config) => {
    const cookies = new Cookies()
    const { token = null } = cookies.get('_GIV_USER') || {}
    const { responseType, url, baseURL } = config

    const endpoint = url.replace(baseURL, '').replace(/^\/+|\/+$/g, '')

    if (checkAction([actions.token, actions.renew], endpoint)) {
      localStorage.removeItem(TABS_CACHE_KEY)
    }

    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data'
    }

    if (
      !checkAction([actions.token, actions.subdomain], endpoint) &&
      responseType !== 'arraybuffer' &&
      token
    ) {
      config.headers.Authorization = `Bearer ${token}`
    } else {
      delete config.headers.Authorization
    }

    return config
  },
  (error) => Promise.reject(error),
)

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ERR_CANCELED') return

    const { config, response } = error
    if (!response) return

    const { url, baseURL } = config
    const endpoint = url.replace(baseURL, '').replace(/^\/+|\/+$/g, '')

    if (
      isAxiosRequestConfig(config) &&
      !checkAction([actions.token, actions.subdomain], endpoint) &&
      [401, 403].includes(response.status)
    ) {
      Logout(`${location.origin}?error=${response.status}`)
    }

    return Promise.reject(error)
  },
)

export default axios
