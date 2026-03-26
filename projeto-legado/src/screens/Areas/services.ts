import axios from '../../services/Axios'
import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../utils/Formatters'
import { isObject } from '../../utils/Validators'

import * as Types from './types'

export const getHierarchies = async (): Promise<Types.Hierarchy[]> => {
  const params = {
    by_person: '',
    sort: 'id',
  }

  const { data: response } = await axios.get('/v1/tr/hierarchies/options', {
    params,
  })

  if (!isObject(response) || response.success !== true)
    throw new Error('Request returned no success')
  if (!Array.isArray(response.data))
    throw new Error('Request returned an invalid data')

  const hierarchies = response.data.reduce<Types.Hierarchy[]>(
    (hierarchies, e) => {
      if (!isObject(e)) return hierarchies

      const id = numberOrDefault(e.id)
      if (!id) return hierarchies

      const hierarchy: Types.Hierarchy = {
        id,
        name: notEmptyStringOrDefault(e.name, ''),
      }

      return [...hierarchies, hierarchy]
    },
    [],
  )

  return hierarchies
}

export const getPendingRegions = async (): Promise<Types.Region[]> => {
  const params = {
    has_modification: 1,
    system: 1,
  }

  const { data: response } = await axios.get('/v1/tr/regions/details', {
    params,
  })

  if (!isObject(response) || response.success !== true)
    throw new Error('Request returned no success')
  if (!Array.isArray(response.data))
    throw new Error('Request returned an invalid data')

  const regions = response.data.reduce<Types.Region[]>((regions, e) => {
    const id = numberOrDefault(e.global_region_id)
    if (!id) return regions

    const region: Types.Region = {
      id,
      name: notEmptyStringOrDefault(e.name, ''),
    }

    return [...regions, region]
  }, [])

  return regions
}
