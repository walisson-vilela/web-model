import axios from '../../../../../services/Axios'
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
  have_details?: 1 | 0,
): Promise<Return> => {
  const params: any = {}

  if (hierarchy) params.hierarchy_id = hierarchy
  if (regions.length) params.area = regions
  if (teams.length) params.teams = teams
  if (have_details !== null) params.segments_grouped_outside = have_details

  const { data } = await axios.get('v1/tr/widgets/stats/range-quality', {
    params,
  })

  if (!isObject(data)) {
    throw new Error('Request return an invalid data')
  }

  if (data.success !== true) {
    throw new Error('Request return no success')
  }

  // Retornando o conteúdo do body da requisição
  return {
    success: data.success,
    data: data.data,
  }
}
