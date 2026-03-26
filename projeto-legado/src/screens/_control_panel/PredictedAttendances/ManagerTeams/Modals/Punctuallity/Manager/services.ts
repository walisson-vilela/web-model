import { SortState } from '@mw-kit/mw-manager'

import axios from '../../../../../../../services/Axios'

export const getData = async (
  search: string,
  sort: SortState | null,
  page: number,
  people_id: number,
  date: string,
): Promise<any> => {
  const params: any = {
    page,
    limit: 200,
    people_id: people_id,
    date,
  }
  if (search) params.q = search
  if (sort) {
    params.sort = sort.sort
    params.direction = sort.direction
  }

  const { data } = await axios.get(
    `/v1/tr/stores/statistic-attendances/list-by-punctuality-peoples`,
    { params },
  )
  if (!data.success) throw new Error('Invalid Request')

  return data
}
