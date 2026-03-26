import jwtDecode from 'jwt-decode'
import { Cookies } from 'react-cookie'

import mime from '../json/mimes.json'
import { isObject } from '../standardized/utils/validators'

import { isArray } from './Validators'

interface TokenPayload {
  iss: number
  payload: {
    account: string
    account_master: number
    client: number
    contractor: number
    created_in: number
    password_expiration: string
    password_expired: boolean
    people: number
    session_id: string
    tmp_password: boolean
    type: string
  }
  account: number
  account_master: number
  client: number
  contractor: number
  created_in: number
  password_expiration: string
  password_expired: boolean
  people: number
  session_id: string
  tmp_password: boolean
  type: string
  sub: number
  url: string
}

type GetTokenFunc = {
  (decoded?: true): TokenPayload
  (decoded: false): string
}

export const getUserCookies = (cookieName: string = '_GIV_USER') => {
  const cookies = new Cookies()

  return cookies.get(cookieName)
}

export const getToken: GetTokenFunc = (decoded: boolean = true) => {
  const cookies = getUserCookies()

  if (!isObject(cookies) || typeof cookies.token !== 'string') {
    throw new Error('Could not get user token')
  }

  if (!decoded) return cookies.token as never

  const token = jwtDecode<TokenPayload>(cookies.token)

  return token as never
}

export const removeTrailingSlash = (pathname: string): string => {
  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
}

export const getMIME = (nameOrExt: string | [string, ...string[]]) => {
  const get = (item: string): string => {
    const ext = item.split('.').pop()

    return mime[ext] || mime._primitives[ext] || null
  }

  return isArray(nameOrExt) ? nameOrExt.map(get) : get(nameOrExt)
}
