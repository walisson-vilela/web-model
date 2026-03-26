import { GenericObject } from '@mw-kit/mw-ui/types'

import axios from '../../../../../../../services/Axios/instance'
import {
  dateOrDefault,
  numberOrDefault,
} from '../../../../../../../utils/Formatters'
import { notEmptyStringOrDefault } from '../../../../../../utils/formatters'
import { isObject } from '../../../../../../utils/validators'

import * as T from './types'

const getBirthdays = async (
  start: moment.Moment,
  end: moment.Moment,
  filters?: { page: number; q?: string },
) => {
  const params = {
    birthday: [start.format('MM-DD'), end.format('MM-DD')],
    ...(filters || {}),
    sort: 'birthday',
  }

  const { data: response } = await axios.get('v1/tr/users/options', { params })

  if (
    !isObject(response) ||
    response.success !== true ||
    !isObject(response.pagination)
  ) {
    throw new Error('invalid response')
  }

  return response as {
    success: true
    data: unknown[]
    pagination: GenericObject
  }
}

export const getTotalBirthdays = async (
  start: moment.Moment,
  end: moment.Moment,
) => {
  const response = await getBirthdays(start, end)

  const total = numberOrDefault(response.pagination.count)
  if (total === null) {
    throw new Error('invalid response')
  }

  return total
}

export const getBirthdayPeople = async (
  page: number,
  search: string,
  start: moment.Moment,
  end: moment.Moment,
) => {
  const response = await getBirthdays(start, end, {
    page,
    ...(search ? { q: search } : {}),
  })

  const total = numberOrDefault(response.pagination.count)
  if (total === null) {
    throw new Error('invalid response')
  }

  const people = response.data.reduce<T.Person[]>((people, e) => {
    if (!isObject(e) || !isObject(e.person)) return people

    const id = numberOrDefault(e.id)
    const birthday = dateOrDefault(
      e.person.birthdate,
      null,
      'YYYY-MM-DD HH:mm:ss',
    )
    if (!id || !birthday) return people

    const person: T.Person = {
      id,
      name: notEmptyStringOrDefault(e.name, ''),
      birthday,
      role: (() => {
        if (!isObject(e.role)) return null

        const id = numberOrDefault(e.role.id)
        if (!id) return null

        return {
          id,
          name: notEmptyStringOrDefault(e.role.name, ''),
        }
      })(),

      avatar: isObject(e.avatar)
        ? notEmptyStringOrDefault(e.avatar.url, '')
        : '',
    }

    return [...people, person]
  }, [])

  const pagination: T.Pagination = {
    page: numberOrDefault(response.pagination.current_page),
    last: response.pagination.has_next_page !== true,
    total: numberOrDefault(response.pagination.count, 0),
  }

  return {
    people,
    pagination,
  }
}
