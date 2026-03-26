import axios from '../../../../../services/Axios'
import {
  dateOrDefault,
  notEmptyStringOrDefault,
} from '../../../../../utils/Formatters'
import { isObject, isOneOf } from '../../../../../utils/Validators'

import { types } from './constants'
import {
  FormInterface,
  Type,
  getSettingInterface,
  postSettingInterface,
} from './interfaces'

// Essa função irá fazer a requisição das pendencias.

export const getSettingData = async ({
  pendence,
  extract = false,
  sort,
}: getSettingInterface): Promise<any> => {
  const params: any = {}
  if (sort) {
    params.sort = sort.sort
    params.direction = sort.direction
  }

  const {
    data: { data },
  } = await axios.get(
    `v1/tr/account-settings/peoples/pendencies/${
      extract ? pendence + '.xlsx' : pendence
    }`,
    { params },
  )
  // Retornando o conteúdo do body da requisição
  return data
}

// Essa função irá fazer o post dos dados.
export const saveSettingsData = async (
  params: postSettingInterface,
): Promise<any> => {
  const { data } = await axios.post(
    'v1/tr/account-settings/user-login-type-schedules/add',
    params,
  )

  // Retornando o conteúdo do body da requisição
  return data
}

// Essa função irá verificar qual credencial o usuário está utilizando.
export const getCurrentSchedule = async (): Promise<FormInterface | null> => {
  const { data } = await axios.get(
    'v1/tr/account-settings/user-login-type-schedules/current',
  )

  if (!isObject(data) || !data.success || !isObject(data.data)) {
    return null
  }

  const type = notEmptyStringOrDefault(data.data.type, null)
  if (!isOneOf(type, types)) return null

  const date = dateOrDefault(data.data.due_date, null, 'YYYY-MM-DD')
  if (!date) return null

  // check if schedule has already passed
  const a = new Date(`${date} 00:00:00`)
  a.setHours(0, 0, 0, 0)
  const b = new Date()
  b.setHours(0, 0, 0, 0)
  if (a.getTime() < b.getTime()) return null

  return { type, date }
}

// Essa função ira pegar o tipo atual da credencial do usuário.
export const getCurrentType = async (): Promise<Type> => {
  const { data } = await axios.get(`/v1/account-settings/view/250`)

  if (
    !isObject(data) ||
    !data.success ||
    !isObject(data.data) ||
    !isObject(data.data.settings_decoded)
  ) {
    throw new Error('invalid response')
  }

  const type = notEmptyStringOrDefault(data.data.settings_decoded.current_type)

  if (!isOneOf(type, types)) return types[0]

  // Retornando o conteúdo do body da requisição
  return type
}
