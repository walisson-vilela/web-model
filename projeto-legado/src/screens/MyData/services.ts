import { FormState } from 'react-hook-form'

import axios from '../../services/Axios/instance'
import { isObject } from '../../standardized/utils/validators'

import { Form } from './interfaces'
import { saveParser } from './parser'

export const getMe = async (): Promise<any> => {
  const { data } = await axios.get(`/v1/users/me`)
  if (!data.success)
    throw new Error('Não foi possivel carregar os dados usuário')
  if (!isObject(data.data)) throw new Error('Erro na requisição')
  return data.data
}

export const editUser = async (
  formData: Form,
  dirtyFields: FormState<Form>['dirtyFields'],
  id: number,
): Promise<void> => {
  const payload = await saveParser(formData, dirtyFields)

  const { data } = await axios.post(`v1/tr/persons/edit/${id}`, payload, {
    ...(payload.avatar
      ? { headers: { 'Content-Type': 'multipart/form-data' } }
      : {}),
  })

  if (!isObject(data) || data.success !== true) {
    throw new Error('Invalid response')
  }
}
