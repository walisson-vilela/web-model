import axios from '../../../../services/Axios'
import { isObject } from '../../../../utils/Validators'

export const view = async (id: number): Promise<any> => {
  const { data } = await axios.get(`v1/account-settings/view/${id}`)
  if (!data.success || !isObject(data.data)) {
    throw new Error('A requisição falhou')
  }
  return data.data
}

export interface SavePayload {
  setting_id: number
  settings: any
}

export const save = async (payload: SavePayload) => {
  const { data } = await axios.post(`v1/account-settings/add`, payload)
  if (!data.success) {
    throw new Error('A requisição falhou')
  }
  return data
}
