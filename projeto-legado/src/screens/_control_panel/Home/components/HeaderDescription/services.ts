import axios from '../../../../../services/Axios'
import { isObject } from '../../../../../utils/Validators'

export const getHierarchies = async (): Promise<any> => {
  const { data } = await axios.get('v1/tr/hierarchies/options', {
    params: {
      by_person: '',
      sort: 'id',
    },
  })

  if (!isObject(data)) {
    throw new Error('Request return an invalid data')
  }

  if (data.success !== true) {
    throw new Error('Request return no success')
  }

  // Retornando o conteúdo do body da requisição
  return data
}

export const getRegions = async (hierarchy_id: string): Promise<any> => {
  const params = { hierarchy_id, sort: 'name' }

  const { data } = await axios.get('v1/tr/regions', { params })

  if (!isObject(data)) {
    throw new Error('Request return an invalid data')
  }

  if (data.success !== true) {
    throw new Error('Request return no success')
  }

  // Retornando o conteúdo do body da requisição
  return data
}

export const getTeams = async (hierarchy_id: string): Promise<any> => {
  const { data } = await axios.get(`v1/tr/hierarchies/${hierarchy_id}/elements`)

  if (!isObject(data)) {
    throw new Error('Request return an invalid data')
  }

  if (data.success !== true) {
    throw new Error('Request return no success')
  }

  // Retornando o conteúdo do body da requisição
  return data
}
