import { FiltersInterfaces, SortState } from '@mw-kit/mw-manager'
import { GenericObject } from '@mw-kit/mw-ui/types'

import axios from '../../../../../services/Axios'
import { download } from '../../../../../utils/DownloadFile'
import { booleanOrDefault } from '../../../../../utils/Formatters'
import { TYPE_MASTER, TYPE_SUBCONTRACTOR } from '../../constants'

export {
  deleteMultiple,
  getContractorsMenus,
  toggleStatus,
  updateContractor,
} from '../../services'

// TODO: refatorar esse metodo e tratar o retorno dele.

// Essa função irá fazer a requisição ou extração dos dados.
export const getContractors = async (
  appliedFilters: FiltersInterfaces.AppliedFilter[],
  search: string,
  sort: SortState | null,
  page: number,
  extract?: boolean,
  ids: number[] = [],
): Promise<GenericObject> => {
  const params: GenericObject = {
    page: page,
    limit: 200,
    type: [TYPE_MASTER, TYPE_SUBCONTRACTOR].join(','),
  }
  const toExtract = booleanOrDefault(extract, false)

  if (appliedFilters.length > 0) {
    appliedFilters.map((e) => (params[e.name] = e.value))
  }

  if (search) params.q = search
  if (sort) {
    params.sort = sort.sort
    params.direction = sort.direction
  }

  if (toExtract && ids.length > 0) params.id = ids.join(',')

  const { data } = await axios.get(
    `/v1/tr/contractors${toExtract ? '.xlsx' : ''}`,
    {
      params,
    },
  )

  // Retornando o conteúdo do body da requisição
  return data
}

// Essa função irá fazer a requisição para extração dos dados
export const extractData = async (
  appliedFilters: FiltersInterfaces.AppliedFilter[],
  search: string,
  sort: SortState | null,
  page: number,
  ids: number[] = [],
): Promise<void> => {
  const { success, data } = await getContractors(
    appliedFilters,
    search,
    sort,
    page,
    true,
    ids,
  )

  success && download(data.url)
}
