import { GenericObject } from '@mw-kit/mw-ui/types'

import { TabsContextProps } from '../../../routes/types'
import axios from '../../../services/Axios'
import {
  booleanOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../utils/Formatters'
import { ValidationError } from '../../components/form/modals'
import { isObject } from '../../utils/validators'

import { AssociatedUser } from './components/ResponsibleTeam/types'

export const getContractor = async (id: number): Promise<GenericObject> => {
  const params = {}

  const { data } = await axios.get(`v1/tr/contractors/${id}`, {
    params,
  })

  if (!data.success) throw new Error('Request returned no sucess!')
  if (!isObject(data.data)) throw new Error('Request returned an invalid data!')

  return data.data
}

export const createContractor = async (
  params: GenericObject,
): Promise<
  | { success: true; id: number; errors?: GenericObject }
  | { success: false; data: GenericObject; errors?: GenericObject }
> => {
  const { data } = await ValidationError.handler(async () => {
    return await axios.post('v1/tr/contractors', params, {
      ...(params.avatar || params.ppt_template
        ? {
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        : {}),
    })
  })

  if (!isObject(data)) {
    throw new Error('Invalid response')
  }

  const success = booleanOrDefault(data.success, false)
  if (success === null) {
    throw new Error('Missing success status')
  }

  if (success === false) {
    if (!isObject(data.errors)) throw new Error('Missing errors')
    return { success, data: data }
  }

  if (!isObject(data.data)) throw new Error('Request returned an invalid data!')

  const id = numberOrDefault(data.data.id)
  if (id === null) throw new Error('Request returned an invalid id!')

  return { success, id, errors: data.erros }
}

export const updateContractor = async (
  id: number,
  params: GenericObject,
  afterSave?: (id: number, params: GenericObject) => Promise<void>,
): Promise<{ success: true } | { success: false; errors: GenericObject }> => {
  const { data } = await ValidationError.handler(async () => {
    return await axios.post(`v1/tr/contractors/edit/${id}`, params, {
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

export const getContractorByName = async (
  nickname: string,
  id: number | null,
): Promise<{ success: boolean; data: unknown }> => {
  const params: GenericObject = {
    nickname,
  }

  if (id) params.id = id

  const { data } = await axios.get('v1/tr/contractors/check-nickname', {
    params,
  })

  return {
    success: booleanOrDefault(data.success, false),
    data: data.data,
  }
}

export const getMasterUser = async (): Promise<
  AssociatedUser & { re: string }
> => {
  const { data: response } = await axios.get('/v1/tr/users/master')

  if (!response.success) throw new Error('Request returned no success!')
  if (!isObject(response.data) || !isObject(response.data.role)) {
    throw new Error('Request returned an invalid data!')
  }

  const id = numberOrDefault(response.data.id)
  if (!id) throw new Error('Request returned an invalid data!')

  const parsed: AssociatedUser & { re: string } = {
    person_id: id,
    name: notEmptyStringOrDefault(response.data.name, ''),
    administrator: true,
    role: {
      id: numberOrDefault(response.data.role.id),
      name: notEmptyStringOrDefault(response.data.role.name),
      master: booleanOrDefault(response.data.role.master, false),
    },
    re: notEmptyStringOrDefault(response.data.person.registration, ''),
    menu_ids: (Array.isArray(response.data.users_menus)
      ? (response.data.users_menus as unknown[])
      : []
    ).reduce<number[]>((menu_ids, e) => {
      if (!isObject(e)) return menu_ids
      const id = numberOrDefault(e.menu_id)
      if (!id) return menu_ids
      return [...menu_ids, id]
    }, []),
  }

  return parsed
}

export const getContractorPeoples = async (): Promise<AssociatedUser[]> => {
  const parsed: AssociatedUser[] = []

  try {
    const master = await getMasterUser()
    parsed.push(master)
  } catch (e) {
    console.error(e)
  }

  return parsed
}

export const toggleStatus = async (
  status: 0 | 1,
  ids: number[],
): Promise<void> => {
  const { data: response } = await axios.post(
    'v1/tr/contractors/toggle-status',
    {
      ids,
      status,
    },
  )

  if (!isObject(response) || !response.success) {
    throw new Error('Response without success')
  }
}

export const deleteMultiple = async (
  ids: number[],
  closeTab: TabsContextProps['close'],
): Promise<void> => {
  const { data: response } = await axios.delete(
    '/v1/tr/contractors/delete-ids',
    { data: { ids } },
  )

  if (!isObject(response) || !response.success) {
    throw new Error('Response without success')
  }

  ids.forEach((id) => {
    closeTab({
      match: {
        path: '/main/accounts/contractors/edit/:id',
        url: `/main/accounts/contractors/edit/${id}`,
      },
      location: {
        pathname: `/main/accounts/contractors/edit/${id}`,
        search: '',
      },
    })

    closeTab({
      match: {
        path: '/main/accounts/contractors/groups/edit/:id',
        url: `/main/accounts/contractors/groups/edit/${id}`,
      },
      location: {
        pathname: `/main/accounts/contractors/groups/edit/${id}`,
        search: '',
      },
    })
  })
}

export const getContractorsMenus = async (id: number) => {
  const params: GenericObject = {}
  params['no-paginate'] = 1
  const { data } = await axios.get(`/v1/tr/contractors/${id}/menus`, {
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
