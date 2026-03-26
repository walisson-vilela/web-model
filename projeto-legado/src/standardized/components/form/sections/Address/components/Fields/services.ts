import { GenericObject } from '@mw-kit/mw-ui/types'

import axios from '../../../../../../../services/Axios'
import { isObject } from '../../../../../../utils/validators'

export const getAddressByPostalCode = async (
  postal_code: string,
): Promise<GenericObject> => {
  const { data } = await axios.post('/addresses/by-postal-code', {
    postal_code,
  })

  if (!isObject(data) || !isObject(data.data)) {
    throw new Error('Request returned an invalid data!')
  }

  if (!data.success) {
    throw new Error('Request returned no success!')
  }

  return data.data
}
