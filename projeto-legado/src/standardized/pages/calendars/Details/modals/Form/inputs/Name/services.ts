import axios from '../../../../../../../../services/Axios'
import { booleanOrDefault } from '../../../../../../../../utils/Formatters'

export const checkName = async (
  name: string,
  tab: string,
  id: number | undefined,
): Promise<boolean> => {
  const params = {
    name: name,
    type: tab,
    ...(id ? { id: id } : {}),
  }

  try {
    const { data: response } = await axios.get('v1/tr/user-events/check-name', {
      params: params,
    })

    return booleanOrDefault(response.success, false)
  } catch (e) {
    console.error(e)
    throw new Error('Request Error')
  }
}
