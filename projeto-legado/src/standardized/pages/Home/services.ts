import axios from '../../../services/Axios/instance'
import { getToken } from '../../../utils'
import { numberOrDefault } from '../../../utils/Formatters'
import { notEmptyStringOrDefault } from '../../utils/formatters'
import { isObject } from '../../utils/validators'

import * as T from './types'

export const getMenus = async (): Promise<T.Item[]> => {
  const { data: response } = await axios.get('v1/menus/tree')

  if (
    !isObject(response) ||
    !response.success ||
    !Array.isArray(response.data)
  ) {
    throw new Error('Invalid response')
  }

  const items = response.data.reduce<T.Item[]>((items, e) => {
    if (!isObject(e)) return items

    const children = (Array.isArray(e.children) ? e.children : []).reduce<
      T.SubItem[]
    >((children, e) => {
      if (!isObject(e)) return children

      const child: T.SubItem = {
        name: notEmptyStringOrDefault(e.name, ''),
        target: notEmptyStringOrDefault(e.link, ''),
      }

      return [...children, child]
    }, [])

    const item: T.Item = {
      id: numberOrDefault(e.id, 0),
      name: notEmptyStringOrDefault(e.name, ''),
      icon: notEmptyStringOrDefault(e.icon, ''),
      target: notEmptyStringOrDefault(e.link, ''),
      children,
    }

    return [...items, item]
  }, [])

  return items
}

export const parseContractor = (e: unknown): T.Contractor | null => {
  if (!isObject(e)) return null

  const id = numberOrDefault(e.id)
  if (!id) {
    return null
  }

  const parsed: T.Contractor = {
    id,
    account_id: numberOrDefault(e.account_id),
    nickname: notEmptyStringOrDefault(e.name, ''),
    company_name: notEmptyStringOrDefault(e.company_name, ''),
    document: notEmptyStringOrDefault(e.document, ''),
    avatar: (() => {
      if (!isObject(e.avatar)) {
        return null
      }

      const url = notEmptyStringOrDefault(e.avatar.avatar)
      if (!url) {
        return null
      }

      return {
        name: notEmptyStringOrDefault(
          e.avatar.name,
          url.split('/').slice(-1)[0],
        ),
        url,
      }
    })(),
    type: notEmptyStringOrDefault(e.type, ''),
    type_label: notEmptyStringOrDefault(e.type_label, ''),
  }

  return parsed
}

export const getContractor = async (): Promise<T.Contractor> => {
  const {
    payload: { contractor },
  } = getToken()

  const { data: response } = await axios.get(
    `/v1/tr/contractors/${contractor}`,
    { params: { short: '' } },
  )

  if (!isObject(response) || !response.success) {
    throw new Error('Invalid response')
  }

  const parsed = parseContractor(response.data)
  if (!parsed) {
    throw new Error('Invalid response')
  }

  return parsed
}

export const getLoggedUser = async () => {

  const { data: response } = await axios.get('v1/users/me')

  if (
    !isObject(response) ||
    !response.success ||
    !isObject(response.data) ||
    !isObject(response.data.user)
  ) {
    throw new Error('invalid response')
  }

  const { data } = response

  const id = numberOrDefault(data.user.id)
  if (!id) {
    throw new Error('invalid response')
  }

  const user: T.User = {
    id,
    name: notEmptyStringOrDefault(data.user.name, ''),
    username: notEmptyStringOrDefault(data.user.username, ''),

    role: (() => {
      if (!isObject(data.user.role)) return null

      const id = numberOrDefault(data.user.role.id)
      if (!id) return null

      return {
        id,
        name: notEmptyStringOrDefault(data.user.role.name, ''),
      }
    })(),

    avatar: isObject(data.user.avatar)
      ? notEmptyStringOrDefault(data.user.avatar.avatar, '')
      : '',
  }

  return user
}

export const getUnreadMessages = async () => {
  const params = {
    visualized: 0,
    mode: 'inbox',
    limit: 0,
  }

  const { data } = await axios.get('/v1/tr/messages', { params })

  if (!isObject(data)) {
    throw new Error('Request returned an invalid data')
  }

  if (!data.success) {
    throw new Error('Request returned no success')
  }

  if (!Array.isArray(data.data)) {
    throw new Error('Request returned an invalid data')
  }

  const response = numberOrDefault(data.unread_count)

  if (response === null) {
    throw new Error('Request returned an invalid data')
  }

  return response
}
