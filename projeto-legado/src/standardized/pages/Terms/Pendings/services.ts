import axios from '../../../../services/Axios'
import { getUserCookies } from '../../../../utils'
import {
  booleanOrDefault,
  dateOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../utils/Formatters'
import { isObject } from '../../../../utils/Validators'

import { DataTerm } from './interfaces'

export const getTerms = async (): Promise<DataTerm[]> => {
  const { data: response } = await axios.get('/v1/tr/users/terms')

  if (
    !isObject(response) ||
    !response.success ||
    !Array.isArray(response.data)
  ) {
    throw new Error('Invalid response')
  }

  const parsed = (response.data as unknown[]).reduce<DataTerm[]>((data, e) => {
    if (!isObject(e)) return data

    const id = numberOrDefault(e.id)
    if (!id) return data

    const system = booleanOrDefault(e.system)
    if (system === null) return data

    const parsed: DataTerm = {
      id,
      system,
      title: notEmptyStringOrDefault(e.title, ''),
      content: notEmptyStringOrDefault(e.content, ''),
      created_at: dateOrDefault(e.created_at, ''),
      accepted: booleanOrDefault(e.accepted),
      subject: notEmptyStringOrDefault(e.subject, ''),
      required: booleanOrDefault(e.required, false),
    }

    return [...data, parsed]
  }, [])

  return parsed
}

export const acceptTerms = async (term_id: number, params: DataTerm) => {
  const { data } = await axios.post(`/v1/terms/accept/${term_id}`, params)
  if (!data.success) throw new Error('Não foi possível executar essa operação')

  if (!isObject(data.data)) throw new Error('Erro na requisição')

  return data
}

export const refuseTerms = async (term_id: number, system: boolean) => {
  const { data } = await axios.delete(
    `/v1/tr/user-terms/delete/${term_id}/${Number(system)}`,
  )
  if (!data.success) throw new Error('Não foi possível executar essa operação')

  return data
}

export const renewToken = async (contractor: number) => {
  const cookies = getUserCookies() || {}
  const keep = booleanOrDefault(cookies.KEEP_CONNECTED, false)

  const { data } = await axios.post(`/v1/tr/users/renew/${contractor}`, {
    keep,
  })

  if (!data.success) throw new Error('Não foi possível executar essa operação')

  if (!isObject(data.data)) throw new Error('Erro na requisição')

  return data
}
