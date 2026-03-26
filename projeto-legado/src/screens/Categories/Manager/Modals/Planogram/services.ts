import axios from '../../../../../services/Axios'
import { isObject } from '../../../../../standardized/utils/validators'

import { PlanogramRegistries } from './interfaces'

export const submit = async (
  files: PlanogramRegistries[],
  id: number,
): Promise<void> => {
  const payload = {
    planograms: files.map((file) => ({
      ...(file.id ? { id: file.id } : {}),
      title: file.subject,
      comment: file.description,
      ...(file.image
        ? {
            file: { file: file.image },
          }
        : {}),
    })),
  }

  const { data } = await axios.post(`/v1/tr/categories/edit/${id}`, payload, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

  if (!isObject(data) || data.success !== true) {
    throw new Error('Request failed')
  }
}
