import axios from '../../../../../services/Axios'

export const getRegionsByID = async (
  id: number,
  search: string,
): Promise<any> => {
  const params: any = { region_id: id, limit: 200 }

  if (search) params.q = search

  const { data } = await axios.get(`/v1/routes`, { params })

  // Retornando o conteúdo do body da requisição
  return data
}
