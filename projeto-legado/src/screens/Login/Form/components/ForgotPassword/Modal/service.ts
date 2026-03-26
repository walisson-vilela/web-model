import { GenericObject } from '@mw-kit/mw-ui/types'
import { isAxiosError } from 'axios'

import axios from '../../../../../../services/Axios'
import {
  booleanOrDefault,
  notEmptyStringOrDefault,
} from '../../../../../../utils/Formatters'
import { isBoolean, isObject } from '../../../../../../utils/Validators'

import { IRecoverPassword } from './interfaces'

const parsedRecoverPassword = (data: GenericObject): IRecoverPassword => {
  const success = data.success
  if (!isBoolean(success)) throw new Error('Invalid Response')

  if (!isObject(data.data)) {
    throw new Error('Invalid Property Response')
  }

  return {
    success,
    data: {
      supervisor: booleanOrDefault(data.data.supervisor, true),
      email: notEmptyStringOrDefault(data.data.email, ''),
    },
  }
}

export const recoverPassword = async (
  account: number,
  username: string,
): Promise<IRecoverPassword> => {
  const params = { account, username }

  try {
    const { data } = await axios.post('/v1/tr/users/recover-password', params)
    const response = parsedRecoverPassword(data)

    return response
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response && error.response.status === 404) {
        return 404
      }
    }
    throw error
  }
}
