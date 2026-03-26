import { SortState } from '@mw-kit/mw-manager'

import axios from '../../../../../services/Axios'
import { download } from '../../../../../utils/DownloadFile'

// Essa função irá fazer a requisição ou extração dos dados.
export const getLicenses = async (
  type: number,
  page: number,
  search: string,
  sort: SortState | null,
  extract: boolean = false,
): Promise<any> => {
  const params: any = { type, page }

  if (search) params.q = search

  if (sort) {
    params.sort = sort.sort
    params.direction = sort.direction
  }

  const { data } = await axios.get(
    `/v1/tr/contractor-license-hierarchies${extract ? '.xlsx' : ''}`,
    { params },
  )

  // Retornando o conteúdo do body da requisição
  return data
}

// Essa função irá fazer a requisição para extração dos dados
export const extractData = async (
  id: number,
  page: number,
  search: string,
  sort: SortState | null,
): Promise<any> => {
  const { success, data } = await getLicenses(id, page, search, sort, true)

  success && download(data.url)
}
