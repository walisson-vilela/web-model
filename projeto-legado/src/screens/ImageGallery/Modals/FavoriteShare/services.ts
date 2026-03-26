import axios from '../../../../services/Axios'
import { Permissions } from '../../Home/tabs/Favorites/interfaces'

export const getPeople = async (search: string, page: number): Promise<any> => {
  const params: any = { page }

  if (search) params.q = search

  const { data } = await axios.get('/v1/peoples', { params })

  // Retornando o conteúdo do body da requisição
  return data
}

export const edit = async (
  file_favorite_permissions: Pick<Permissions, 'people_id' | 'role'>[],
  id: number,
): Promise<any> => {
  const params: any = { file_favorite_permissions }

  const { data } = await axios.put(
    `v1/tr/image-gallery/file-favorites/edit/${id}`,
    params,
  )

  // Retornando o conteúdo do body da requisição
  return data
}
