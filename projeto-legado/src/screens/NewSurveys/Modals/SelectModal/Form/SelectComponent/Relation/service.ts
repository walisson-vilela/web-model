import { AppliedFilter } from '@mw-kit/mw-ui/types'

import axios from '../../../../../../../services/Axios/instance'

interface GetRelationsItemsProps {
  route: string
  search: string
  appliedFilters: AppliedFilter[]
  page: number
}

export const GetRelationsItems = async ({
  route,
  appliedFilters,
  search,
  page,
}: GetRelationsItemsProps) => {
  const params: any = { page }
  search ? (params.q = search) : ''
  route == '/v1/tr/forms/options?default=0' && appliedFilters.length === 0
    ? (params.contractor_id = 'SELF,UNKNOWN,PARENT')
    : ''

  appliedFilters.length > 0 &&
    appliedFilters.map((e) => (params[e.name] = e.value))

  const { data } = await axios.get(`${route}`, { params })

  if (!data.success) throw new Error('Invalid Request!')

  return data
}

export const getDetailForms = async (id: number): Promise<any> => {
  const params = {
    contain: 'Forms',
  }
  const { data } = await axios.get(`/v1/tr/surveys/view/${id}`, { params })

  return data
}
