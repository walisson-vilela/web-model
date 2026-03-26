import axios from '../../../../../../../../../../services/Axios'

import { FormInterface } from './types'

export const deleteUserEvent = async (
  userId: number,
  eventId: number,
  values: FormInterface,
): Promise<void> => {
  const payload = values.activate
    ? {}
    : {
        classification_id: values.classification?.id,
        ...(values.file ? { file: { file: values.file } } : {}),
      }

  await axios.post(`v1/tr/users/${userId}/events/delete/${eventId}`, payload, {
    ...('file' in payload
      ? { headers: { 'Content-Type': 'multipart/form-data' } }
      : {}),
  })
}
