import axios from '../../../../../../../services/Axios/instance'
import { numberOrDefault } from '../../../../../../../utils/Formatters'
import { isObject } from '../../../../../../utils/validators'

const addById = async (id?: number | null): Promise<number> => {
  const { data: response } = await axios.post(`v1/tr/stores/add-by-id/${id}`)

  if (!isObject(response) || !response.success || !isObject(response.data)) {
    throw new Error('Invalid response')
  }

  const store_id = numberOrDefault(response.data.id)

  if (!store_id) throw new Error('Missing Id')

  return store_id
}

export default addById
