import React, { SetStateAction } from 'react'

import { FiltersInterfaces, SortState } from '@mw-kit/mw-manager'

import { ModalState } from '../../../components/MwModal'
import axios from '../../../services/Axios'
import { download } from '../../../utils/DownloadFile'
import {
  booleanOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../utils/Formatters'
import { isObject } from '../../../utils/Validators'

import { BodyInterface } from './interfaces'
import { parser } from './parser'

// Essa função irá fazer a requisição ou extração dos dados.
const request = async (
  appliedFilters: FiltersInterfaces.AppliedFilter[],
  search: string,
  sort: SortState | null,
  page?: number,
  ids?: number[],
  extract?: boolean,
) => {
  const params = {
    ...(page ? { page: page } : { limit: 200 }),
    ...appliedFilters.reduce((filter, e) => {
      return { ...filter, [e.name]: e.value }
    }, {}),
    ...(sort ? sort : {}),
    ...(search ? { q: search } : {}),
    ...(ids && ids.length > 0 ? { id: ids.join(',') } : {}),
    contain: 'Planograms',
  }
  const data = await axios.get(`/v1/tr/categories${extract ? '.xlsx' : ''}`, {
    params,
  })

  return data
}

export const getClassifications = async (
  appliedFilters: FiltersInterfaces.AppliedFilter[],
  search: string,
  sort: SortState | null,
  page: number,
  setModal: React.Dispatch<SetStateAction<ModalState | null>>,
): Promise<{
  data: BodyInterface[]
  pagination: {
    has_next_page: boolean
    count: number
  }
}> => {
  const { data: response } = await request(appliedFilters, search, sort, page)

  if (!Array.isArray(response.data)) throw new Error('invalid response')

  // Retornando o conteúdo do body da requisição
  return {
    data: parser(response.data, setModal),
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

  ids: number[],
): Promise<void> => {
  const { data: response } = await request(
    appliedFilters,
    search,
    sort,
    null,
    ids,
    true,
  )

  if (!isObject(response) || !isObject(response.data))
    throw new Error('Invalid response')

  const url = notEmptyStringOrDefault(response.data.url)
  if (!url) throw new Error('Could not get download url')

  download(url)
}

export const toggleStatus = async (
  status: boolean,
  ids: number[],
): Promise<void> => {
  await axios.put('/v1/tr/categories/toggle-status', {
    ids,
    status,
  })
}

export const deleteMultiple = async (ids: number[]): Promise<void> => {
  await axios.delete('/v1/tr/categories/delete-ids', { data: { ids } })
}
