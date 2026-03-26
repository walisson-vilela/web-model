import { AppliedFilter } from '@mw-kit/mw-ui/types'

import axios from '../../../../../../../services/Axios'
import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../../utils/Formatters'
import { isObject } from '../../../../../../../utils/Validators'
import { StoreProps } from '../interface'

const buildFilterParams = (filters: AppliedFilter[]) => {
  const params: { [key: string]: string | number | boolean } = {}
  filters.forEach((filter) => {
    if (filter.value) {
      params[filter.name] = filter.value
    }
  })
  return params
}

export const getStores = async (
  search: string,
  appliedFilter: AppliedFilter[],
  market_flag_id?: number,
): Promise<StoreProps[]> => {
  const params = {
    contain: 'MarketFlags',
    limit: 200,
    ...(search
      ? { q: search, q_options: 'Stores.name,Stores.formatted_address' }
      : {}),
    ...(market_flag_id ? { market_flag_id } : {}),
    ...buildFilterParams(appliedFilter),
  }

  const { data: res } = await axios.get(`/v1/tr/stores`, { params })

  if (!isObject(res)) {
    throw new Error('Invalid response')
  }

  if (!res.success || !Array.isArray(res.data)) {
    throw new Error('Invalid value response')
  }

  const parsed = res.data.reduce((parsed, e) => {
    if (!isObject(e) || !isObject(e.stores_contractor) || !isObject(e.address))
      return parsed

    const id = numberOrDefault(e.id)

    if (!id) return parsed

    const market_flag = (() => {
      if (!isObject(e.stores_contractor.market_flag)) {
        return undefined
      }
      const id = numberOrDefault(e.stores_contractor.market_flag.id)
      if (!id) return undefined

      return {
        id,
        name: notEmptyStringOrDefault(e.stores_contractor.market_flag.name),
      }
    })()

    const data: StoreProps = {
      id,
      stores_contractor: {
        nickname: notEmptyStringOrDefault(e.stores_contractor.nickname),
        market_flag,
      },
      address: {
        formatted: notEmptyStringOrDefault(e.address.formatted),
        postal_code: notEmptyStringOrDefault(e.address.postal_code),
      },
    }
    return [...parsed, data]
  }, [] as StoreProps[])

  return parsed
}
