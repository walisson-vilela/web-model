import { GenericObject } from '@mw-kit/mw-ui/types'

import axios from '../../../../services/Axios'
import {
  notEmptyStringOrDefault,
  numberOrDefault,
  objectToFormData,
} from '../../../../utils/Formatters'
import { isObject } from '../../../../utils/Validators'
import { useFileUpload } from '../../../../utils/hooks'
import {
  FileUpload,
  useFileUploaderProps,
} from '../../../../utils/hooks/useFileUpload'

export const save = async (form: GenericObject): Promise<void> => {
  const { data } = await axios.post('/v1/tr/messages', form)

  if (!data.success) throw new Error('Save returned no sucess!')
}

export const getMessage = async (
  id: number,
): Promise<{ success: true; data: GenericObject }> => {
  const { data } = await axios.get(`/v1/tr/messages/${id}`)

  if (data.success !== true || !isObject(data) || !isObject(data.data))
    throw new Error('Invalid Response')

  // Retornando o conteúdo do body da requisição
  return data as ReturnType<typeof getMessage>
}

export const uploadFile = (
  props: Pick<useFileUploaderProps, 'file' | 'onError'>,
  directory: 'messages' | 'message_posts',
): void => {
  useFileUpload({
    ...props,
    request: {
      url: 'v1/files',
      method: 'POST',
      parser: (file) => {
        const payload = objectToFormData({
          file,
          container: 'files',
          directory,
        })

        return payload
      },
    },
    response: {
      parser: (response, file) => {
        if (
          !isObject(response.data) ||
          !response.data.success ||
          !isObject(response.data.data)
        )
          throw new Error('Invalid response')

        const parsed: Exclude<FileUpload, File> = {
          id: numberOrDefault(response.data.data.id, 0),
          file: {
            name: notEmptyStringOrDefault(response.data.data.name, file.name),
            size: numberOrDefault(response.data.data.size, file.size),
            url: notEmptyStringOrDefault(response.data.data.url, ''),
          },
        }

        if (!parsed.id) throw new Error('Invalid response')

        return parsed
      },
    },
  })
}
