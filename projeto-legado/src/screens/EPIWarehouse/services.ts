import { GenericObject } from '@mw-kit/mw-ui/types'
import axios from '../../services/Axios'

import { ValidationError } from '../../standardized/components/form/modals'
import { isObject } from '../../utils/Validators'

import {
  booleanOrDefault,
  numberOrDefault
} from '../../utils/Formatters'


export const updateEpisWareHouse = async (
  id: number,
  params: GenericObject,
  afterSave?: (id: number, params: GenericObject) => Promise<void>,
): Promise<{ success: true } | { success: false; errors: GenericObject }> => {
  const { data } = await ValidationError.handler(async () => {
    return await axios.post(`v1/tr/epi/epi-warehouse/invoices/edit/${id}`, params, {
      ...(params.avatar || params.ppt_template
        ? {
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        : {}),
    })
  })

  if (afterSave) await afterSave(id, params)

  if (!isObject(data)) {
    throw new Error('Invalid response')
  }

  const success = booleanOrDefault(data.success)
  if (success === null) {
    throw new Error('Missing success status')
  }

  if (success === false) {
    if (!isObject(data.errors)) throw new Error('Missing errors')
    return { success, errors: data.errors }
  }

  return { success }
}

export const getEpisWarehouseMenus = async (id: number) => {
  const params: GenericObject = {}
  params['no-paginate'] = 1
  const { data } = await axios.get(`/v1/tr/epi/epi-warehouse/invoices/${id}/menus`, {
    params,
  })

  if (!isObject(data) || !Array.isArray(data.data)) {
    throw new Error('invalid response')
  }

  return data.data.reduce<number[]>((acc, item) => {
    if (!isObject(item)) {
      return acc
    }
    const menu_id = numberOrDefault(item.menu_id)

    if (menu_id === null) return acc

    return [...acc, menu_id]
  }, [])
}
