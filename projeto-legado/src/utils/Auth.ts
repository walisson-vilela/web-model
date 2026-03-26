import jwtDecode from 'jwt-decode'
import { Cookies } from 'react-cookie'

import { STORAGE } from '../constants/AppTypesConstants'
import { ITokenDecoded } from '../standardized/pages/Terms/Pendings/interfaces'
import { renewToken } from '../standardized/pages/Terms/Pendings/services'

import { isBoolean } from './Validators'

export const LOGOUT_COOKIE = 'LOGOUT'

const clearLocalStorage = () => {
  const keep_user = localStorage.getItem('keep_user') || ''
  const keep_account = localStorage.getItem('keep_account') || ''
  localStorage.clear()
  if (keep_user) localStorage.setItem('keep_user', keep_user)
  if (keep_account) localStorage.setItem('keep_account', keep_account)
}

export const Logout = (reload: boolean | string = true) => {
  const cookies = new Cookies()

  const hasSupport = JSON.parse(localStorage.getItem('isSupport'))

  clearLocalStorage()

  cookies.remove('_GIV_USER', {
    path: '/',
    domain: window['domain']
      ? `.${window['domain']}`
      : window.location.hostname,
  })
  cookies.set(LOGOUT_COOKIE, 1)

  const params: { support?: '' } = {}
  if (hasSupport && hasSupport.support) {
    localStorage.setItem('isSupport', JSON.stringify({ support: true }))
    params.support = ''
  }

  if (!reload) return

  const url = new URL(isBoolean(reload) ? location.origin : reload)
  Object.keys(params).map((k) => url.searchParams.append(k, params[k]))

  location.replace(url.toString())
}

export const reloadUser = async () => {
  const cookies = new Cookies()

  const userStorage = cookies.get(STORAGE.USER)

  const { token } = userStorage

  const { payload } = jwtDecode<ITokenDecoded>(token)

  const { contractor } = payload

  try {
    const { data, success } = await renewToken(contractor)

    const { token: newToken, terms, pathname } = data
    delete userStorage.token
    if (success) {
      const valueCookies = { ...userStorage, token: newToken, terms }

      cookies.remove(STORAGE.USER)
      cookies.set(STORAGE.USER, valueCookies, {
        path: '/',
        domain: window['domain']
          ? `.${window['domain']}`
          : window.location.hostname,
      })
      const url = cookies.get(STORAGE.USER).HOME_URL
      window.location.replace(url)
    }
  } catch (e) {
    console.error(e)
  }
}
