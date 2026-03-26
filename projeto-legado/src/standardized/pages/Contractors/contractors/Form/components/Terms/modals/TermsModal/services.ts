import { AxiosProgressEvent } from 'axios'

import { ImageHandle } from '../../../../../../../../../components/TextEditor'
import axios from '../../../../../../../../../services/Axios'
import {
  notEmptyStringOrDefault,
  numberOrDefault,
  objectToFormData,
} from '../../../../../../../../../utils/Formatters'
import { isObject } from '../../../../../../../../../utils/Validators'

export const uploadImage: ImageHandle['upload'] = async (
  image,
  setProgress,
) => {
  const payload = objectToFormData({
    file: image,
    container: 'images',
    directory: 'contractor_terms',
  })

  const { data: response } = await axios.post('v1/files', payload, {
    onUploadProgress: (e: AxiosProgressEvent) => {
      const progress = e.total ? Math.floor((e.loaded * 100) / e.total) : null

      progress && setProgress(progress)
    },
  })

  if (!isObject(response) || !response.success) {
    throw new Error('Could not upload file')
  }
  return {
    id: numberOrDefault(response.data.id, 0),
    name: notEmptyStringOrDefault(response.data.name, image.name),
    size: numberOrDefault(response.data.size, image.size),
    url: notEmptyStringOrDefault(response.data.url, ''),
  }
}
