import { GenericObject } from '@mw-kit/mw-ui/types'

import axios from '../../../../../../../../../services/Axios'
import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../../../../utils/Formatters'
import { isObject } from '../../../../../../../../utils/validators'

import { BodyInterface } from './interfaces'

export const getForms = async (name?: string): Promise<BodyInterface[]> => {
  const params: GenericObject = {
    'no-paginate': 1,
  }

  if (name) params.q = name

  const { data: response } = await axios.get('v1/tr/forms/options', {
    params,
  })
  if (!isObject(response)) throw new Error('Invalid Response')

  if (!response.success) throw new Error('Request returned no success!')

  if (!Array.isArray(response.data)) {
    throw new Error('Request returned an invalid data!')
  }

  const parsed = response.data.reduce((response, data) => {
    if (!isObject(data)) return response

    const id = numberOrDefault(data.id)
    if (!id) return response

    const parsed: BodyInterface = {
      id,
      name: notEmptyStringOrDefault(data.name, ''),
      name_str: '',
    }

    parsed.name_str = [parsed.id, parsed.name].join(' - ')

    return [...response, parsed]
  }, [] as BodyInterface[])

  return parsed
}
