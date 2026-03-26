import axios from '../../../../../services/Axios'
import { keys } from '../../../../../utils/Formatters'
import { isObject } from '../../../../../utils/Validators'

import { formType } from './interfaces'

const getBlobFile = (file: string) => {
  let arr = file.split(',')
  let bstr = window.atob(arr[1])
  let n = bstr.length
  let uBarr = new Uint8Array(n)

  while (n--) uBarr[n] = bstr.charCodeAt(n)

  let blobFile = new File(
    [uBarr],
    `avatar.${file.split(';')[0].split('/')[1]}`,
    { type: arr[0].match(/:(.*?);/)[1] },
  )
  return blobFile
}

export const submit = async (
  formData: formType,
  id: number,
  file: string,
  fileUploaded: boolean,
): Promise<any> => {
  const payload = {
    ...keys(formData).reduce((params, key) => {
      return formData[key] === null
        ? params
        : { ...params, [key]: formData[key] }
    }, {} as Partial<formType>),

    ...(fileUploaded
      ? {}
      : {
          avatar:
            file && !file.startsWith('http')
              ? {
                  file: getBlobFile(file),
                }
              : null,
        }),
  }

  const params = isObject(payload.avatar)
    ? { headers: { 'Content-Type': 'multipart/form-data' } }
    : {}

  const { data } = id
    ? await axios.post(`/v1/tr/markets/edit/${id}`, payload, params)
    : await axios.post('/v1/tr/markets/add', payload, params)

  // Retornando o conteúdo do body da requisição
  return data
}
