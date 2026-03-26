import { AxiosRequestConfig } from 'axios'

import { getMIME } from '../../utils'
import { notEmptyStringOrDefault } from '../../utils/Formatters'

import instance from './instance'

interface SaveFileOptions extends Omit<AxiosRequestConfig, 'responseType'> {}

const downloadFile = async (
  url: string,
  options?: SaveFileOptions,
): Promise<{ buffer: Buffer; fileName: string }> => {
  const { data } = await instance.get(url, {
    responseType: 'arraybuffer',
    ...options,
  })

  const buffer = Buffer.from(data, 'binary')
  const parsedURL = new URL(url)

  const fileName = notEmptyStringOrDefault(
    parsedURL.pathname.split('/').slice(-1)[0],
    'image.png',
  )

  return { buffer, fileName }
}

const saveFile = async (
  url: string,
  options?: SaveFileOptions,
): Promise<void> => {
  const { buffer, fileName } = await downloadFile(url, options)

  const href = URL.createObjectURL(new Blob([buffer]))
  const el = document.createElement('a')

  el.setAttribute('href', href)
  el.setAttribute('download', fileName)
  el.style.display = 'none'

  document.body.appendChild(el)

  el.click()

  document.body.removeChild(el)
}

interface Base64Options extends Omit<AxiosRequestConfig, 'responseType'> {
  includeMIME?: boolean
}

const returnBase64 = async (
  url: string,
  options?: Base64Options,
): Promise<string> => {
  const { includeMIME = false, ...rest } = options || {}

  const { buffer, fileName } = await downloadFile(url, rest)

  if (options) {
    if (includeMIME) {
      return `data:${getMIME(fileName)}base64,${buffer.toString('base64')}`
    }
  }

  return buffer.toString('base64')
}

const axios = {
  get: instance.get,
  post: instance.post,
  put: instance.put,
  delete: instance.delete,
  patch: instance.patch,
  file: saveFile,
  base64: returnBase64,
}

export default axios
