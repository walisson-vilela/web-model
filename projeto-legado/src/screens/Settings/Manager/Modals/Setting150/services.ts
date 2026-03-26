import axios from '../../../../../services/Axios'

import { BodyInterface, DataInterface } from './interfaces'

// Essa função irá fazer a requisição ou extração dos dados.
export const getSettingData = async (): Promise<DataInterface> => {
  const {
    data: { data },
  } = await axios.get('/v1/account-settings/view/150')

  // Retornando o conteúdo do body da requisição
  return data
}

// Essa função irá fazer a requisição ou extração dos dados.
export const onSubmit = async (setting_data: BodyInterface): Promise<any> => {
  const params: any = {
    setting_id: 150,
    settings: setting_data,
  }

  const { data } = await axios.post('/v1/account-settings/add', params)

  // Retornando o conteúdo do body da requisição
  return data
}
