import React from 'react'

import { FiltersInterfaces, SortState } from '@mw-kit/mw-manager'
import { GenericObject } from '@mw-kit/mw-ui/types'

import { ModalState } from '../../../../components/MwModal'
import axios from '../../../../services/Axios'
import { getWorkShifts } from '../services/list'

import type { BodyInterface } from './interface'
import { managerWorkShiftsParser } from './parser'

export const getManagerWorkShifts = async (
  search: string,
  page: number,
  setModal: React.Dispatch<React.SetStateAction<ModalState>>,
  appliedFilters?: FiltersInterfaces.AppliedFilter[],
  sort?: SortState | null,
): Promise<{
  data: BodyInterface[]
  pagination: {
    has_next_page: boolean
    count: number
    page: number
  }
}> => {
  const response = await getWorkShifts({
    search,
    page,
    appliedFilters,
    sort,
  })

  return {
    ...response,
    data: managerWorkShiftsParser(response.data, setModal),
  }
}

export const toggleStatusWorkshift = (
  ids: number[],
  active: boolean,
): Promise<void> => {
  const params: GenericObject = {
    ids,
    active,
  }

  return axios.put('v1/tr/work-shifts/toggle-status', params)
}

export const deleteMultiple = (ids: number[]): Promise<void> => {
  const params: GenericObject = {
    ids,
  }
  return axios.delete('v1/tr/work-shifts/delete-ids', { data: params })
}
