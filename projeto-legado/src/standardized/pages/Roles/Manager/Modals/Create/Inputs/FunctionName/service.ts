import axios from '../../../../../../../../services/Axios'
import { booleanOrDefault } from '../../../../../../../../utils/Formatters'
import { isObject } from '../../../../../../../utils/validators'

export const checkName = async (
  name: string,

  id?: number | null,
): Promise<boolean> => {
  const { data: response } = await axios.get('/v1/tr/roles/check-name', {
    params: {
      ...(id ? { id } : {}),
      name,
    },
  })

  if (!isObject(response)) throw new Error('Invalid response')

  return booleanOrDefault(response.success, false)
}
