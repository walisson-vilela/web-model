import axios from '../../../../services/Axios'

interface getParamsArgs {
  distribution_center_id: number
  search: string
  page?: number
}

const getParams = (args: getParamsArgs): any => {
  const { distribution_center_id, search, page } = { ...args }

  let params: any = {
    limit: 200,
    contain_distribution_center_id: distribution_center_id,
    level: 2,
  }

  if (page) params.page = page

  if (search) {
    params.q = search
  }

  return params
}

export const getCategories = async (
  distribution_center_id: number,
  search: string,
  page: number,
): Promise<any> => {
  const params = getParams({ distribution_center_id, search, page })

  const { data } = await axios.get('/v1/tr/categories', { params })

  return data
}
