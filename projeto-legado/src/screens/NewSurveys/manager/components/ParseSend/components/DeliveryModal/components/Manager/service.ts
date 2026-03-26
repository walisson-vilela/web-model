import { SortState } from '@mw-kit/mw-manager'

import axios from '../../../../../../../../../services/Axios'

export const getDetails = async (
  survey_id: number,
  search: string,
  sort: SortState | null,
  extract: boolean = false,
): Promise<any> => {
  const params: any = { survey_id }
  if (search) params.q = search
  if (sort) {
    params.sort = sort.sort
    params.direction = sort.direction
  }
  const { data } = await axios.get(
    `/v1/tr/survey-deliveries/index${extract ? '.xlsx' : ''}`,
    {
      params,
    },
  )
  if (!data.success) throw new Error('Invalid Request')

  return data
}
