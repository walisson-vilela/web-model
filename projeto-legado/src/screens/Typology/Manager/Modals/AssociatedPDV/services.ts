import { SortState } from '@mw-kit/mw-manager'

import axios from '../../../../../services/Axios'
import { download } from '../../../../../utils/DownloadFile'

// Essa função irá fazer a requisição ou extração dos dados.
export const getStores = async (
  id: number,
  default_id: number | null,
  search: string,
  sort: SortState | null,
  extract: boolean = false,
): Promise<any> => {
  const params = {
    contain: 'Segments',
    limit: 9999,
    ...(default_id ? { typology_default_id: default_id } : { typology_id: id }),
    ...(sort ? sort : {}),
    ...(search ? { q: search } : {}),
    ...(extract ? { type_export: 'typology_stores' } : {}),
  }

  const { data } = await axios.get(`/v1/tr/stores${extract ? '.xlsx' : ''}`, {
    params,
  })

  // Retornando o conteúdo do body da requisição
  return data
}

// Essa função irá fazer a requisição para extração dos dados
export const extractData = async (
  id: number,
  default_id: number | null,
  search: string,
  sort: SortState | null,
): Promise<any> => {
  const { success, data } = await getStores(id, default_id, search, sort, true)

  success && download(data.url)
}
