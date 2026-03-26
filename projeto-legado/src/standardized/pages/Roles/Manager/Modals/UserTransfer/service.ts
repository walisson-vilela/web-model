import { GenericObject } from '@mw-kit/mw-ui/types'

import axios from '../../../../../../services/Axios/instance'
import { booleanOrDefault } from '../../../../../../utils/Formatters'
import { isObject } from '../../../../../../utils/Validators'
import { ValidationError } from '../../../../../components/form/modals'

export const saveSelected = async (
  ids: number[],
  role_id: number,
): Promise<{ success: true } | { success: false; errors: GenericObject }> => {
  const params = { role_id, ids }

  const { data: response } = await ValidationError.handler(
    async () => await axios.post('/v1/tr/users/edit-role', params),
  )

  if (!isObject(response)) {
    throw new Error('Invalid response')
  }

  const success = booleanOrDefault(response.success)
  if (success === null) {
    throw new Error('Missing success status')
  }

  if (success) return { success }

  if (!isObject(response.errors)) throw new Error('Missing errors')

  return { success, errors: response.errors }
}
