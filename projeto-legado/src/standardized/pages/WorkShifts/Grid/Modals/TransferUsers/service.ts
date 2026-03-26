import { GenericObject } from '@mw-kit/mw-ui/types'

import axios from '../../../../../../services/Axios/instance'
import { booleanOrDefault } from '../../../../../../utils/Formatters'
import { isObject } from '../../../../../../utils/Validators'
import { ValidationError } from '../../../../../components/form/modals'

export const saveSelected = async (
  userIds: number[],
  work_shift_id: number,
): Promise<{ success: true } | { success: false; errors: GenericObject }> => {
  const params = { work_shift_id, ids: userIds }

  const { data: response } = await ValidationError.handler(
    async () => await axios.put('v1/tr/users/edit-work-shift', params),
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
