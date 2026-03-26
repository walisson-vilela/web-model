import { Cookies } from 'react-cookie'

import axios from '../../../../../services/Axios'
import {
  booleanOrDefault,
  dateOrDefault,
  notEmptyStringOrDefault,
} from '../../../../../utils/Formatters'
import { isObject } from '../../../../../utils/Validators'

const USER_KEY = '_GIV_USER'

const renew = async (
  account: number,
  username: string,
  password: string,
): Promise<void> => {
  const cookies = new Cookies()
  const userCookies = cookies.get(USER_KEY)
  const keep = booleanOrDefault(userCookies.KEEP_CONNECTED, true)

  const { data: response } = await axios.post('/v1/users/token', {
    account,
    username,
    password,
    terms: true,
    keep,
  })

  if (!isObject(response) || !response.success || !isObject(response.data)) {
    throw new Error('Invalid response')
  }

  const parsed = {
    token: notEmptyStringOrDefault(response.data.token),
    terms: booleanOrDefault(response.data.terms, false),
    password_expiration: dateOrDefault(
      response.data.password_expiration,
      null,
      'YYYY-MM-DD[T]HH:mm:ss',
    ),
    password_expired: booleanOrDefault(response.data.password_expired, false),
    tmp_password: booleanOrDefault(response.data.tmp_password, false),
  }

  if (!parsed.token) {
    throw new Error('Invalid response token')
  }

  cookies.set(
    USER_KEY,
    {
      ...userCookies,
      ...parsed,
    },
    {
      path: '/',
      domain: window['domain'] ? `.${window['domain']}` : location.hostname,
    },
  )

  const home = notEmptyStringOrDefault(
    response.data.pathname,
    notEmptyStringOrDefault(userCookies.HOME_URL, '/main/home'),
  )
  window.location.href = home
}

export default renew
