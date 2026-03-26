import { FiltersInterfaces, SortState } from '@mw-kit/mw-manager'
import { GenericObject } from '@mw-kit/mw-ui/types'

import axios from '../../../../../services/Axios'
import { download } from '../../../../../utils/DownloadFile'
import { booleanOrDefault } from '../../../../../utils/Formatters'
import { TYPE_GROUP } from '../../constants'

export { deleteMultiple, toggleStatus } from '../../services'

// Essa função irá fazer a requisição ou extração dos dados.
export const getManager = async (
  appliedFilters: FiltersInterfaces.AppliedFilter[],
  search: string,
  sort: SortState | null,
  page: number,
  extract?: boolean,
  ids: number[] = [],
): Promise<GenericObject> => {
  const params: GenericObject = { page: page, limit: 200 }

  const toExtract = booleanOrDefault(extract, false)

  if (appliedFilters.length > 0) {
    appliedFilters.map((e) => (params[e.name] = e.value))
  }

  if (search) {
    params.q = search
  }

  if (sort) {
    params.sort = sort.sort
    params.direction = sort.direction
  }

  if (toExtract && ids.length > 0) {
    params.id = ids.join(',')
  }

  const { data } = await axios.get(
    `v1/tr/contractors${toExtract ? '.xlsx' : ''}?type=${TYPE_GROUP}`,
    { params },
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
  const { success, data } = await getManager(
    appliedFilters,
    search,
    sort,
    page,
    true,
    ids,
  )

  success && download(data.url)
}
