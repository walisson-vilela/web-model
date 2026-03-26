import axios from '../../../../../../../services/Axios/instance'
import { getUserCookies } from '../../../../../../../utils'
import {
  booleanOrDefault,
  numberOrDefault,
} from '../../../../../../../utils/Formatters'
import { notEmptyStringOrDefault } from '../../../../../../utils/formatters'
import { isObject } from '../../../../../../utils/validators'
import { parseContractor } from '../../../../services'
import { Contractor } from '../../../../types'

export const getContractorsAccount = async (
  search: string,
  page: number,
  except: number,
): Promise<{
  data: Contractor[]
  pagination: {
    page: number
    count: number
    has_next_page: boolean
  }
}> => {
  const params = {
    ...(search ? { q: search } : {}),
    page,
    contain: ['Avatars'].join(),
    'by-person': '',
  }

  const { data: response } = await axios.get('v1/tr/contractors/options', {
    params,
  })

  if (!isObject(response)) throw new Error('Invalid Response')

  const { data } = response
  if (!Array.isArray(data)) throw new Error('invalid response')

  return {
    data: data.reduce<Contractor[]>((data, e) => {
      const parsed = parseContractor(e)
      return [...data, ...(parsed && parsed.id !== except ? [parsed] : [])]
    }, []),
    pagination: {
      page,
      count: data.length,
      has_next_page: false,
      ...(isObject(response.pagination)
        ? {
            count: numberOrDefault(response.pagination.count, data.length),
            has_next_page: booleanOrDefault(
              response.pagination.has_next_page,
              false,
            ),
          }
        : {}),
    },
  }
}

const parserRenew = (
  data: unknown,
): { token: string; pathname: string; terms: boolean } => {
  if (!isObject(data)) throw new Error('Invalid Response')

  const parser: { token: string; pathname: string; terms: boolean } = {
    token: notEmptyStringOrDefault(data.token),
    pathname: notEmptyStringOrDefault(data.pathname),
    terms: booleanOrDefault(data.terms, false),
  }

  return parser
}

export const renewUser = async (
  id: number,
): Promise<{ token: string; pathname: string; terms: boolean }> => {
  const cookies = getUserCookies() || {}

  const params = {
    pathname: `${window.location.pathname}${window.location.search}`,
    keep: booleanOrDefault(cookies.KEEP_CONNECTED, false),
  }

  const { data: response } = await axios.post(`v1/tr/users/renew/${id}`, params)

  if (!isObject(response)) throw new Error('Invalid Response')

  return parserRenew(response.data)
}
