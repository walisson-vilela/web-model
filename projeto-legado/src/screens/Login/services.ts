import axios from '../../services/Axios'
import { isObject } from '../../utils/Validators'

import { ILoginBy, LoginForm, LoginReturn } from './interfaces'

export const checkSubdomain = async (
  subdomain: string,
): Promise<{ success: boolean; data: ILoginBy }> => {
  const { data } = await axios.post('/v1/accounts/check-subdomain', {
    subdomain,
  })

  if (!isObject(data)) {
    throw new Error('Request return an invalid data')
  }

  if (data.success !== true) {
    throw new Error('Request return no success')
  }

  // Retornando o conteúdo do body da requisição
  return data as ReturnType<typeof checkSubdomain>
}

export const login = async (
  formData: LoginForm,
): Promise<{ data: LoginReturn }> => {
  const payload = {
    account: parseInt(formData.account),
    username: formData.username,
    password: formData.password,
    terms: formData.terms,
    keep: formData.keep,
  }

  const { data } = await axios.post('/v1/users/token', payload)

  if (!isObject(data)) {
    throw new Error('Request return an invalid data')
  }

  if (data.success !== true) {
    throw new Error('Request return no success')
  }

  // Retornando o conteúdo do body da requisição
  return data as ReturnType<typeof login>
}

export const loginByService = async (id: number) => {

  const { data } = await axios.get(`/v1/accounts/login-by/${id}`)

  if (!data.success) throw new Error('Invalid request')

  return data.data
}
