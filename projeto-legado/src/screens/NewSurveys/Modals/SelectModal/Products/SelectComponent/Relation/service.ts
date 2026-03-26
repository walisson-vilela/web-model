import { AppliedFilter } from '@mw-kit/mw-ui/types'

import axios from '../../../../../../../services/Axios/instance'

interface GetRelationsItemsProps {
  route: string
  search: string
  appliedFilters: AppliedFilter[]
  page: number
  contain?: any
}

export const GetRelationsItems = async ({
  route,
  appliedFilters,
  search,
  page,
  contain,
}: GetRelationsItemsProps) => {
  const params: any = { page, ...contain }
  search ? (params.q = search) : ''
  appliedFilters.length > 0 &&
    appliedFilters.map((e) => (params[e.name] = e.value))

  const { data } = await axios.get(`${route}`, { params })

  if (!data.success) throw new Error('Invalid Request!')

  return data
}

export const getDetailForms = async (
  id: number,
  containTab: string,
): Promise<any> => {
  const params = {
    contain: containTab,
  }
  const { data } = await axios.get(`/v1/tr/surveys/view/${id}`, { params })

  return data
}
