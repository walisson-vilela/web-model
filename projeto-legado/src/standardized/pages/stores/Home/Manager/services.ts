import { FiltersInterfaces, SortState } from '@mw-kit/mw-manager'
import { GenericObject } from '@mw-kit/mw-ui/types'

import axios from '../../../../../services/Axios'
import { download } from '../../../../../utils/DownloadFile'

// Essa função irá fazer a requisição dos dados.
export const getStores = async (
  appliedFilters: FiltersInterfaces.AppliedFilter[],
  search: string,
  sort: SortState | null,
  page?: number,
  ids?: number[],
  extract?: boolean,
): Promise<GenericObject> => {
  const params: GenericObject = {
    page: page,
    limit: 200,
    contain: [
      'Typologies',
      'MarketGroups',
      'MarketChains',
      'MarketFlags',
      'Segments',
    ].join(),
  }
  if (appliedFilters.length > 0) {
    appliedFilters.map((e) => (params[e.name] = e.value))
  }

  if (params.checkouts) {
    const checkouts = params.checkouts.split(',')
    params.checkout_min = checkouts[0]
    if (checkouts[1]) params.checkout_max = checkouts[1]
    delete params.checkouts
  }

  if (search) params.q = search
  if (extract && ids && ids.length > 0) params.id = ids.join(',')
  if (sort) {
    params.sort = sort.sort
    params.direction = sort.direction
  }

  const { data } = await axios.get(`/v1/tr/stores${extract ? '.xlsx' : ''}`, {
    params,
  })

  // Retornando o conteúdo do body da requisição
  return data
}

// Essa função irá fazer a requisição para extração dos dados
export const extractData = async (
  appliedFilters: FiltersInterfaces.AppliedFilter[],
  search: string,
  sort: SortState | null,
  page: number,
  ids: number[],
): Promise<void> => {
  const { success, data } = await getStores(
    appliedFilters,
    search,
    sort,
    page,
    ids,
    true,
  )

  success && download(data.url)
}

export const toggleStatus = async (
  status: boolean,
  ids: number[],
): Promise<boolean> => {
  try {
    const res = await axios.put('v1/tr/stores/toggle-status', {
      status,
      ids,
    })

    return res.data.success
  } catch (e) {}

  return false
}

export const deleteMultiple = async (ids: number[]): Promise<boolean> => {
  try {
    const res = await axios.post('v1/tr/stores/delete-ids', {
      ids,
    })

    return res.data.success
  } catch (e) {}

  return false
}

export const submitToAudit = async (
  status = null,
  ids: number[],
): Promise<boolean> => {
  try {
    const res = await axios.post('v1/tr/stores/toggle-coordinate-status', {
      ids,

      status,
    })

    return res.data.success
  } catch (e) {}

  return false
}
