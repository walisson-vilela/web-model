import { FiltersInterfaces } from '@mw-kit/mw-manager'

import axios from '../../../services/Axios'
import { isObject } from '../../../utils/Validators'

import { DataInterface } from './interfaces'
import { dataParser } from './parser'

// Essa função irá fazer a requisição ou extração dos dados.
export const getSettings = async (
  appliedFilters: FiltersInterfaces.AppliedFilter[],
  search: string,
  type: 'web' | 'mobile',
): Promise<{ success: true; data: DataInterface[] }> => {
  const params: any = { type }

  if (appliedFilters.length > 0)
    appliedFilters.map((e) => (params[e.name] = e.value))
  if (search) params.q = search

  const { data } = await axios.get('/v1/account-settings', { params })

  if (!isObject(data) || data.success !== true)
    throw new Error('Request returned no success')
  if (!Array.isArray(data.data))
    throw new Error('Request returned an invalid data')

  // Retornando o conteúdo do body da requisição
  return {
    success: true,
    data: dataParser(data.data),
  }
}
