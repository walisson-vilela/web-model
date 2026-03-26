import { GenericObject } from '@mw-kit/mw-ui/types'

import axios from '../../../../../../../services/Axios/instance'
import {
  booleanOrDefault,
  notEmptyStringOrDefault,
} from '../../../../../../../utils/Formatters'
import { isObject } from '../../../../../../utils/validators'

const checkDocument = async (
  code: string,
  id?: number | null,
): Promise<
  | {
      success: false
      nickname: string
    }
  | {
      success: true
    }
> => {
  const params = {
    code,
    ...(id ? { id } : {}),
  }

  const { data: response }: GenericObject = await axios.post(
    'v1/tr/stores/check-code',
    params,
  )

  if (!isObject(response)) throw new Error('Invalid response')

  const success = booleanOrDefault(response.success)
  if (success === null) throw new Error('Missing success')

  if (success === true) {
    return { success }
  }

  if (!isObject(response.data)) {
    throw new Error('Missing data')
  }

  return {
    success,
    nickname: notEmptyStringOrDefault(response.data.nickname, ''),
  }
}

export default checkDocument
