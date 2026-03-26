import { isObject } from '../../../../../utils/Validators'

import { DataInterface } from './interfaces'

interface Return {
  success: boolean
  data: DataInterface
}

export const getData = async (
  hierarchy: string,
  regions: string[],
  teams: string[],
): Promise<Return> => {
  const params: any = {}

  if (hierarchy) params.hierarchy_id = hierarchy
  if (regions.length) params.area = regions
  if (teams.length) params.teams = teams

  // const { data } = await axios.get('v1/tr/widgets/stats/average-distance', { params })

  // TODO: Adicionar chamada do endpoint e remover constante data
  const data: Return = {
    success: true,
    data: {
      planned: 98.01,
      realized: 88.69,
    },
  }

  if (!isObject(data)) {
    throw new Error('Request return an invalid data')
  }

  if (data.success !== true) {
    throw new Error('Request return no success')
  }

  // Retornando o conteúdo do body da requisição
  return data
}
