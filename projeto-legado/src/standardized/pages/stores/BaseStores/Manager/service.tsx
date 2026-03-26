import React from 'react'

import { FiltersInterfaces, SortState } from '@mw-kit/mw-manager'

import axios from '../../../../../services/Axios'
import { download } from '../../../../../utils/DownloadFile'
import {
  booleanOrDefault,
  cnpj,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../utils/Formatters'
import { formatCEP } from '../../../../utils/formatters/numbers'
import { isObject } from '../../../../utils/validators'
import { sourceStatusOrDefault } from '../../functions'

import * as Popups from './Popups'
import { BodyInterface } from './interfaces'

const parser = (data: unknown[]): BodyInterface[] => {
  const parse = data.reduce<BodyInterface[]>((parse, item) => {
    if (!isObject(item) || !isObject(item.address)) return parse

    const id = numberOrDefault(item.id)
    const nickname = notEmptyStringOrDefault(item.nickname)
    const source_status = sourceStatusOrDefault(item.source_status, '')
    const address_formatted = notEmptyStringOrDefault(item.address.formatted)

    if (!id || !nickname || !address_formatted || source_status === '') {
      return parse
    }

    const address_postal_code = formatCEP(
      notEmptyStringOrDefault(item.address.postal_code, ''),
    )

    const store: BodyInterface = {
      id,

      nickname,
      nickname_jsx: <Popups.PopupPDV store_id={id} name={nickname} />,

      document: notEmptyStringOrDefault(item.document),

      source_status,
      address_formatted,
      address_postal_code,
      address_formatted_jsx: (
        <Popups.PopupAddress
          formatted={address_formatted}
          postal_code={address_postal_code}
          source_status={source_status}
        />
      ),

      market_flag_name: null,
      market_flag_name_jsx: null,

      market_group_name: null,
      market_network_name: null,

      segment_name: null,

      typology_name: null,

      contractor_count: numberOrDefault(item.contractor_count, 0),
      contractor_count_jsx: null,
    }

    if (isObject(item.market_group)) {
      store.market_group_name = notEmptyStringOrDefault(item.market_group.name)
    }

    if (isObject(item.market_chain)) {
      store.market_network_name = notEmptyStringOrDefault(
        item.market_chain.name,
      )
    }
    if (isObject(item.market_flag)) {
      store.market_flag_name = notEmptyStringOrDefault(item.market_flag.name)
      if (store.market_flag_name) {
        store.market_flag_name_jsx = (
          <Popups.PopupFlags
            market_flag_name={store.market_flag_name}
            market_group_name={store.market_group_name || '-'}
            market_network_name={store.market_network_name || '-'}
          />
        )
      }
    }

    if (isObject(item.segment)) {
      store.segment_name = notEmptyStringOrDefault(item.segment.name)
    }

    if (isObject(item.typology)) {
      store.typology_name = notEmptyStringOrDefault(item.typology.name)
    }

    if (store.contractor_count > 0) {
      store.contractor_count_jsx = (
        <Popups.PopupCount id={id} contractor_count={store.contractor_count} />
      )
    } else {
      store.contractor_count_jsx = <React.Fragment>0</React.Fragment>
    }

    if (store.document) {
      store.document = cnpj(store.document)
    }

    return [...parse, store]
  }, [])

  return parse
}

const request = async (
  appliedFilters: FiltersInterfaces.AppliedFilter[],
  search: string,
  sort: SortState | null,
  page?: number,
  ids?: number[],
  extract?: boolean,
  can_be_unified_to?: number,
) => {
  const params = {
    ...(page ? { page: page } : { limit: 200 }),
    ...appliedFilters.reduce((filter, e) => {
      return { ...filter, [e.name]: e.value }
    }, {}),
    ...(sort || {}),
    ...(search ? { q: search } : {}),
    ...(ids && ids.length > 0 ? { id: ids.join(',') } : {}),
    contain: [
      'MarketFlags',
      'MarketGroups',
      'MarketChains',
      'Segments',
      'Typologies',
    ].join(),
    ...(can_be_unified_to !== undefined
      ? { can_be_unified_to: can_be_unified_to || '' }
      : {}),
    mode: 'store',
  }
  const data = await axios.get(`/v1/tr/stores${extract ? '.xlsx' : ''}`, {
    params,
  })

  return data
}

export const getStores = async (
  appliedFilters: FiltersInterfaces.AppliedFilter[],
  search: string,
  sort: SortState | null,
  page: number,

  can_be_unified_to?: number,
): Promise<{
  data: BodyInterface[]
  updated: number
  pagination: {
    has_next_page: boolean
    count: number
  }
}> => {
  const { data: response } = await request(
    appliedFilters,
    search,
    sort,
    page,
    undefined,
    undefined,
    can_be_unified_to,
  )

  if (!Array.isArray(response.data)) throw new Error('invalid response')

  // Retornando o conteúdo do body da requisição
  return {
    data: parser(response.data),
    updated: numberOrDefault(response.updated, 0),
    pagination: {
      has_next_page: false,
      count: 0,
      ...(isObject(response.pagination)
        ? {
            has_next_page: booleanOrDefault(
              response.pagination.has_next_page,
              false,
            ),
            count: numberOrDefault(response.pagination.count, 0),
          }
        : {}),
    },
  }
}

// Essa função irá fazer a requisição para extração dos dados
export const extractData = async (
  appliedFilters: FiltersInterfaces.AppliedFilter[],
  search: string,
  sort: SortState | null,
  page: number,
  ids: number[],
): Promise<void> => {
  const { data: response } = await request(
    appliedFilters,
    search,
    sort,
    page,
    ids,
    true,
  )

  if (!isObject(response) || !isObject(response.data)) {
    throw new Error('Invalid response')
  }

  const url = notEmptyStringOrDefault(response.data.url)
  if (!url) throw new Error('Could not get download url')

  download(url)
}

export const deleteStores = async (ids: number[]): Promise<void> => {
  const params = {
    ids,
    mode: 'store',
  }

  await axios.delete('/v1/tr/stores/delete-ids', { data: { ...params } })
}
