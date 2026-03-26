import { FiltersInterfaces, SortState } from '@mw-kit/mw-manager'
import { GenericObject } from '@mw-kit/mw-ui/types'

import axios from '../../../../services/Axios'

export const getMenus = async (
  search: string,
  sort: SortState | null,
  appliedFilters: FiltersInterfaces.AppliedFilter[],
): Promise<GenericObject> => {
  const params: GenericObject = {
    limit: 99999,
    controllable: 1,
    ...(search ? { q: search, contain: 'Parents', level: 1 } : {}),
    ...(sort ? { sort: sort.sort, direction: sort.direction } : {}),
    ...(appliedFilters.length > 0
      ? appliedFilters.reduce((acc, e) => ({ ...acc, [e.name]: e.value }), {})
      : {}),
    skip_user: 1,
  }

  if ('q' in params && 'id' in params) {
    params.parent_id = params.id
    delete params.id
  }

  const { data } = await axios.get(`/v1/menus${!search ? '/tree' : ''}`, {
    params,
  })

  // Retornando o conteúdo do body da requisição
  return data
}
