import { useEffect } from 'react'

import { GenericObject } from '@mw-kit/mw-ui/types'
import { AxiosProgressEvent } from 'axios'

import axios from '../../../services/Axios'
import useAbortRequest from '../useAbortRequest'

type PendingFile = {
  file: File
  progress?: number
}

type UploadedFile = {
  id: number
  file: {
    name: string
    size: number
    url: string
  }
}

export type FileUpload = PendingFile | UploadedFile

export type useFileUploaderProps = {
  file: [FileUpload, React.Dispatch<React.SetStateAction<FileUpload>>]
  request: {
    url: string
    method: 'POST' | 'PUT'
    parser: (file: File) => FormData
  }
  response: {
    parser: (response: GenericObject, file: File) => UploadedFile
  }
  onError: (e: Error) => void
}

const useFileUploader = (props: useFileUploaderProps): void => {
  const {
    file: [file, setFile],
    request,
    response,
    onError,
  } = props

  const { startRequest } = useAbortRequest()

  const upload = (file: PendingFile) => {
    const abortController = startRequest()

    const payload = request.parser(file.file)

    ;(request.method === 'POST' ? axios.post : axios.put)(
      request.url,
      payload,
      {
        onUploadProgress: (e: AxiosProgressEvent) => {
          const progress = Math.floor((e.loaded * 100) / e.total)
          setFile({ ...file, progress })
        },
        signal: abortController.signal,
      },
    )
      .then((data) => {
        const parsed = response.parser(data, file.file)
        setFile(parsed)
        return parsed
      })
      .catch((e) => {
        // case error, remove file
        console.error(e)
        setFile(null)
        onError(e)
      })
  }

  useEffect(() => {
    if ('id' in file || 'progress' in file) return
    upload(file)
  }, [file])
}

export default useFileUploader
