import axios from '../../../../../../../../../services/Axios/instance'
import { download } from '../../../../../../../../../utils/DownloadFile'
import {
  booleanOrDefault,
  numberOrDefault,
} from '../../../../../../../../../utils/Formatters'
import { notEmptyStringOrDefault } from '../../../../../../../../utils/formatters'
import { isObject } from '../../../../../../../../utils/validators'

import type { Regiontype } from './types'

const parseRegions = (item: unknown[]) => {
  return item.reduce<Regiontype[]>((prev, el) => {
    if (!isObject(el)) return prev
    const resp: Regiontype = {
      id: numberOrDefault(el.id, 0),
      name: notEmptyStringOrDefault(el.name, 'Indefinido'),
      country_name: notEmptyStringOrDefault(el.country_name, 'Indefinido'),
    }

    prev.push(resp)
    return prev
  }, [])
}

const fetchRegionsOptions = async (
  hierarchy_id: number,
  search: string,
  page: number | undefined,
  hierarchy_element_id: number,
  user_id: number | undefined,
  sufix = '',
) => {
  const params = {
    hierarchy_id,
    ...(search ? { q: search } : {}),
    ...(user_id ? { user_id } : { hierarchy_element_id }),
    page,
  }

  return await axios.get(`v1/tr/regions/options${sufix}`, {
    params: params,
  })
}

export const getRegionsOptions = async (
  hierarchy_id: number,
  search: string,
  page: number,
  hierarchy_element_id: number,
  user_id: number | undefined,
): Promise<{
  data: Regiontype[]
  pagination: { count: number; has_next_page: boolean; page: number }
}> => {
  const { data: response } = await fetchRegionsOptions(
    hierarchy_id,
    search,
    page,
    hierarchy_element_id,
    user_id,
  )

  if (!isObject(response) || !Array(response.data)) {
    throw new Error('Invalid Response')
  }

  return {
    data: parseRegions(response.data),
    pagination: {
      has_next_page: false,
      page: 1,
      count: 0,
      ...(isObject(response.pagination)
        ? {
            has_next_page: booleanOrDefault(
              response.pagination.has_next_page,
              false,
            ),
            count: numberOrDefault(response.pagination.count, 0),
            page: numberOrDefault(response.pagination.current_page, 1),
          }
        : {}),
    },
  }
}

export const getRegionsOptionsXlsx = async (
  hierarchy_id: number,
  search: string,
  hiearchy_element_id: number,
  user_id: number | undefined,
): Promise<void> => {
  const { data: response } = await fetchRegionsOptions(
    hierarchy_id,
    search,
    undefined,
    hiearchy_element_id,
    user_id,
    '.xlsx',
  )

  if (!isObject(response) || !Array(response.data)) {
    throw new Error('Invalid Response')
  }

  const url = notEmptyStringOrDefault(response.data.url)

  if (!url) {
    throw new Error('Empty url')
  }

  download(url)
}
