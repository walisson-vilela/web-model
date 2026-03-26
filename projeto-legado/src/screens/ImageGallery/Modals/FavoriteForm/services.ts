import axios from '../../../../services/Axios'
import {
  booleanOrDefault,
  notEmptyStringOrDefault,
} from '../../../../utils/Formatters'
import { isObject } from '../../../../utils/Validators'

import { FormData } from './interfaces'

export const get = async (id: number): Promise<FormData> => {
  const { data: response } = await axios.get(
    `v1/tr/image-gallery/file-favorites/view/${id}`,
  )

  if (!isObject(response)) {
    throw Error('Invalid Response')
  }

  const { success, data } = response

  if (!success) {
    throw Error('Request returned no success')
  }

  if (!isObject(data)) {
    throw Error('Request returned an invalid data')
  }

  return {
    name: notEmptyStringOrDefault(data.name, ''),
    description: notEmptyStringOrDefault(data.description, ''),
  }
}

export const checkName = async (params: {
  name: string
  id?: number
}): Promise<boolean> => {
  const { data } = await axios.post(
    'v1/tr/image-gallery/file-favorites/check-name',
    params,
  )

  if (!isObject(data)) {
    throw Error('Invalid Response')
  }

  const success = booleanOrDefault(data.success)

  if (success === null) {
    throw Error('Request returned no success')
  }

  return success
}

export const create = async (payload: FormData): Promise<void> => {
  const { data: response } = await axios.post(
    'v1/tr/image-gallery/file-favorites/add',
    payload,
  )

  if (!isObject(response)) {
    throw Error('Invalid Response')
  }

  const { success } = response

  if (!success) {
    throw Error('Request returned no success')
  }
}

export const edit = async (payload: FormData, id: number): Promise<void> => {
  const { data: response } = await axios.put(
    `v1/tr/image-gallery/file-favorites/edit/${id}`,
    payload,
  )

  if (!isObject(response)) {
    throw Error('Invalid Response')
  }

  const { success } = response

  if (!success) {
    throw Error('Request returned no success')
  }
}
