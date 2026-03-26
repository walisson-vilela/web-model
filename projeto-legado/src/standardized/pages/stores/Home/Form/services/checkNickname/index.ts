import { GenericObject } from '@mw-kit/mw-ui/types'

import axios from '../../../../../../../services/Axios/instance'
import {
  booleanOrDefault,
  cnpj,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../../utils/Formatters'
import { isObject } from '../../../../../../utils/validators'
import { sourceStatusOrDefault } from '../../../../functions'
import { Form, IFormStores } from '../../interfaces'

type ResponseUsed = {
  success: false
  nickname: string
}

type ResponseValid = {
  success: true
}

export type ResponseBaseStore = {
  success: true
  data: {
    id: number
    document: string
    nickname: string
    source_status: Form['source_status']
    address: string
  }
}

type CheckDocumentResponse = ResponseValid | ResponseUsed | ResponseBaseStore

const checkNickname = async (
  nickname: string,
  mode: IFormStores['mode'],
  id?: number | null,
): Promise<CheckDocumentResponse> => {
  const params = {
    nickname,
    ...(id ? { id } : {}),
    ...(mode === 'base-stores' ? { mode: 'store' } : {}),
  }

  const { data: response }: GenericObject = await axios.post(
    'v1/tr/stores/check-nickname',
    params,
  )

  if (!isObject(response)) throw new Error('Invalid response')

  const success = booleanOrDefault(response.success)
  if (success === null) throw new Error('Missing success')

  if (success === false) {
    if (!isObject(response.data)) {
      throw new Error('Invalid response data')
    }

    if (mode === 'stores') {
      if (!isObject(response.data.stores_contractor)) {
        throw new Error('Invalid response data')
      }

      return {
        success,
        nickname: notEmptyStringOrDefault(
          response.data.stores_contractor.nickname,
          '',
        ),
      }
    } else {
      return {
        success,
        nickname: notEmptyStringOrDefault(response.data.nickname, ''),
      }
    }
  }

  if (!isObject(response.data)) {
    return {
      success,
    }
  }

  const store_id = numberOrDefault(response.data.id)
  if (!store_id) {
    throw new Error('Missing store id')
  }

  if (!isObject(response.data.address)) throw new Error('Missing address')

  const source_status = sourceStatusOrDefault(response.data.source_status, '')

  if (source_status === '') {
    throw new Error('Missing source_status')
  }

  return {
    success,
    data: {
      id: store_id,

      document: cnpj(notEmptyStringOrDefault(response.data.document, '')),
      nickname: notEmptyStringOrDefault(response.data.nickname, ''),
      source_status,
      address: notEmptyStringOrDefault(response.data.address.formatted, ''),
    },
  } as ResponseBaseStore
}

export default checkNickname
