import { FiltersInterfaces, SortState } from '@mw-kit/mw-manager'
import axios from '../../../../services/Axios'
import { booleanOrDefault, numberOrDefault } from '../../../../utils/Formatters'
import { isObject } from '../../../../utils/Validators'
import { BodyInterface } from './interfaces'
import parseData from './parser'

export {
  getEpisWarehouseMenus,
  updateEpisWareHouse
} from '../../services'

const request = async (
  appliedFilters: FiltersInterfaces.AppliedFilter[],
  search: string,
  contain: string,
  sort: SortState | null,
  page: number,
  params: string | object,

) => {
  const queryParams = {
    limit: 20,

    contain,

    ...({ page: page }),

    ...(search ? { q: search } : {}),

    ...appliedFilters.reduce((params, filter) => {
      return { ...params, [filter.name]: filter.value }
    }, {}),

    ...(sort ? { sort: sort.sort, direction: sort.direction } : {}),
    ...(typeof params === 'string' ? { [params]: true } : params),
  }

  const { data } = await axios.get(`/v1/epi-fiscal-notes${''}`, {
    params: queryParams,
  })

  if (!isObject(data)) {
    throw new Error('Request returned an invalid data')
  }

  if (!data.success) {
    throw new Error('Request returned no success')
  }

  return data
}

// Requisição de dados do EPI Warehouse
export const getEPIWarehouse = async (
  appliedFilters: FiltersInterfaces.AppliedFilter[],
  search: string,
  contain: string,
  sort: SortState | null,
  page: number,
  params: string | object,
): Promise<{data:BodyInterface[], pagination:{count:number, has_next_page:boolean, page:number}}> => {

  const response = await request(appliedFilters, search, contain, sort, page, params)

  return {
    pagination: {
      has_next_page: false,
      page: 1,
      count: 0,
      ...(isObject(response.pagination)
        ? {
            page: numberOrDefault(response.pagination.page, 1),
            has_next_page: booleanOrDefault(
              response.pagination.has_next_page,
              false,
            ),
            count: numberOrDefault(response.pagination.count, 0),
          }
        : {}),
    },
    data: parseData(response.data),
  }
}
