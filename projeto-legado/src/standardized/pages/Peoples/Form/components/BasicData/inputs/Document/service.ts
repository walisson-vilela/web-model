import axios from '../../../../../../../../services/Axios'
import { booleanOrDefault } from '../../../../../../../../utils/Formatters'
import { notEmptyStringOrDefault } from '../../../../../../../utils/formatters'
import { isObject } from '../../../../../../../utils/validators'
import { Form } from '../../../../interfaces'

type Return = { success: true } | { success: false; data: Pick<Form, 'name'> }

export const checkPeopleDocument = async (
  document: string,
  id?: number | null,
): Promise<Return> => {
  const params = {
    document,
    ...(id ? { id } : {}),
  }

  const { data: response } = await axios.post(
    'v1/tr/persons/check-document',
    params,
  )

  if (!booleanOrDefault(response.success, false)) {
    if (!isObject(response.data)) {
      throw new Error('Request returned an invalid data!')
    }

    return {
      success: false,
      data: { name: notEmptyStringOrDefault(response.data.name, '') },
    }
  }

  return { success: true }
}
