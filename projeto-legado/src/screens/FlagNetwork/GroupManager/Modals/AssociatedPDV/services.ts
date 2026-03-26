import { SortState } from '@mw-kit/mw-manager'

import axios from '../../../../../services/Axios'
import { download } from '../../../../../utils/DownloadFile'

// Essa função irá fazer a requisição ou extração dos dados.
export const getStores = async (
  id: number,
  search: string,
  sort: SortState | null,
  extract: boolean = false,
): Promise<any> => {
  const params = {
    limit: 200,
    contain: 'Segments,Typologies',
    market_group_id: id,
    ...(sort ? sort : {}),
    ...(search
      ? { q: search, q_options: 'Stores.name,Stores.formatted_address' }
      : {}),
    ...(extract ? { type_export: 'segments' } : {}),
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
  search: string,
  sort: SortState | null,
): Promise<any> => {
  const { success, data } = await getStores(id, search, sort, true)

  success && download(data.url)
}
