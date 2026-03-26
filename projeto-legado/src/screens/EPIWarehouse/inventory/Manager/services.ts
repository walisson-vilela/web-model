import { FiltersInterfaces, SortState } from '@mw-kit/mw-manager'
import { GenericObject } from '@mw-kit/mw-ui/types'
import axios from '../../../../services/Axios'
import { booleanOrDefault } from '../../../../utils/Formatters'
export {
  getEpisWarehouseMenus,
  updateEpisWareHouse
} from '../../services'

export const getEPIWarehouse = async (
  appliedFilters: FiltersInterfaces.AppliedFilter[],
  search: string,
  contain: string,
  sort: SortState | null,
  page: number,
  extract?: boolean,
  ids: number[] = [],
): Promise<GenericObject> => {
  const params: GenericObject = { page, limit: 200 }
  const toExtract = booleanOrDefault(extract, false)

  if (appliedFilters.length > 0) {
    appliedFilters.forEach((e) => (params[e.name] = e.value))
  }

  if (search) params.q = search
  if (sort) {
    params.sort = sort.sort
    params.direction = sort.direction
  }
  params.contain = contain

  if (toExtract && ids.length > 0) params.id = ids.join(',')

  const response = await axios.get(`/v1/epis`, { params })
  return response.data
}
