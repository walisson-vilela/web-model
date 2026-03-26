import { SortState } from '@mw-kit/mw-manager'

import axios from '../../../services/Axios'

// Essa função irá fazer a requisição ou extração dos dados.
export const getRoles = async (
  search: string,
  sort: SortState | null,
  page: number,
  ids: number[] = [],
  extract: boolean = false,
): Promise<any> => {
  const params: any = { page, contain: 'RolesHierarchies,RolesMenus' }

  if (extract && ids.length > 0) params.id = ids.join(',')
  if (search) params.q = search
  if (sort) {
    params.sort = sort.sort
    params.direction = sort.direction
  }

  const { data } = await axios.get(`/v1/roles${extract ? '.xlsx' : ''}`, {
    params,
  })

  // Retornando o conteúdo do body da requisição
  return data
}
