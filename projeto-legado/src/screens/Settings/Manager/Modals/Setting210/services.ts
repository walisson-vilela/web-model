import axios from '../../../../../services/Axios'
import {
  keys,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../utils/Formatters'
import { isObject } from '../../../../../utils/Validators'

import * as Types from './types'

const getHierarchies = async (): Promise<Types.Hierarchies> => {
  const { data: response } = await axios.get('/v1/hierarchies')

  if (!isObject(response) || response.success !== true)
    throw new Error('Request returned no success')
  if (!Array.isArray(response.data))
    throw new Error('Request returned an invalid data')

  return response.data.reduce<Types.Hierarchies>((hierarchies, e) => {
    if (!isObject(e)) return hierarchies

    const id = numberOrDefault(e.id)
    if (!id) return hierarchies

    const hierarchy: Types.Hierarchy = {
      id,
      name: notEmptyStringOrDefault(e.name),
      regions: [],
      states: [],
    }

    return { ...hierarchies, [id]: hierarchy }
  }, {})
}

const getSetting = async (): Promise<Types.Hierarchies> => {
  const { data: response } = await axios.get('/v1/account-settings/210')

  if (!isObject(response) || response.success !== true)
    throw new Error('Request returned no success')
  if (!isObject(response.data))
    throw new Error('Request returned an invalid data')

  if (
    !isObject(response.data.settings_decoded) &&
    !Array.isArray(response.data.settings_decoded)
  )
    return {}

  return Object.keys(response.data.settings_decoded).reduce<Types.Hierarchies>(
    (hierarchies, key) => {
      const e = response.data.settings_decoded[key]
      if (!isObject(e)) return hierarchies

      const id = numberOrDefault(e.hierarchy_id)
      if (!id) return hierarchies

      const hierarchy: Types.Hierarchy = {
        id,
        name: null,
        regions: (Array.isArray(e.global_region_type_ids)
          ? e.global_region_type_ids
          : []
        ).reduce<Types.Hierarchy['regions']>((regions, e) => {
          const id = numberOrDefault(e)
          return id ? [...regions, id] : regions
        }, []),
        states: (Array.isArray(e.state_ids) ? e.state_ids : []).reduce<
          Types.Hierarchy['states']
        >((states, e) => {
          const id = numberOrDefault(e)
          return id ? [...states, id] : states
        }, []),
      }

      return { ...hierarchies, [id]: hierarchy }
    },
    {},
  )
}

export const getValues = async (): Promise<Types.Hierarchies> => {
  const hierarchies = await getHierarchies()
  const setting = await getSetting()

  const merged = keys(hierarchies).reduce((merged, id) => {
    const hierarchy = hierarchies[id]

    if (id in setting) {
      hierarchy.regions = setting[id].regions
      hierarchy.states = setting[id].states
    }

    return { ...merged, [id]: hierarchy }
  }, {})

  return merged
}

export const saveSetting = async (data: Types.Hierarchies): Promise<void> => {
  const params = {
    setting_id: 210,
    settings: keys(data).map((key) => {
      const {
        id: hierarchy_id,
        regions: global_region_type_ids,
        states: state_ids,
      } = data[key]

      return {
        hierarchy_id,
        global_region_type_ids,
        state_ids,
      }
    }),
  }

  const { data: response } = await axios.post(
    '/v1/account-settings/add',
    params,
  )

  if (!isObject(response) || response.success !== true)
    throw new Error('Request returned no success')
}
