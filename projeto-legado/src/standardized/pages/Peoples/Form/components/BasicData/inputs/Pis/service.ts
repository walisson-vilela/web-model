import axios from '../../../../../../../../services/Axios'
import { booleanOrDefault } from '../../../../../../../../utils/Formatters'
import { notEmptyStringOrDefault } from '../../../../../../../utils/formatters'
import { isObject } from '../../../../../../../utils/validators'
import { Form } from '../../../../interfaces'

type Return = { success: true } | { success: false; data: Pick<Form, 'name'> }

export const checkPeoplePis = async (
  pis: string,
  id?: number | null,
): Promise<Return> => {
  const params = {
    pis,
    ...(id ? { id } : {}),
  }

  const { data } = await axios.post('v1/tr/persons/check-pis', params)

  if (!booleanOrDefault(data.success, false)) {
    if (!isObject(data.data)) {
      throw new Error('Request returned an invalid data!')
    }

    return {
      success: false,
      data: { name: notEmptyStringOrDefault(data.data.name, '') },
    }
  }

  return { success: true }
}
