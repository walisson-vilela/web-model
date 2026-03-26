import axios from '../../../../services/Axios'
import { booleanOrDefault } from '../../../../utils/Formatters'

// Essa função editar um canal
export const editSegment = async (
  id: number,
  name: string,
): Promise<boolean> => {
  try {
    const { data } = await axios.put(`/v1/tr/segments/${id}`, { name })
    return booleanOrDefault(data.success, false)
  } catch (e) {
    console.error(e)
  }

  return false
}

// Essa função irá criar um canal
export const createSegment = async (name: string): Promise<boolean> => {
  const params: any = { name, status: true }

  try {
    const { data } = await axios.post(`/v1/tr/segments/`, params)
    return booleanOrDefault(data.success, false)
  } catch (e) {
    console.error(e)
  }

  return false
}
