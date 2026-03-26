import React, { SetStateAction } from 'react'

// interface que ira ser usada nos 2 components

type StateAction<T> = React.Dispatch<SetStateAction<T>>

// interfaces do contexto
export interface ChatContextProps {
  handleOpenUploadFilesModal: (value: boolean) => void
  handleSideBar: () => void
  openSideBar: boolean
  openUploadModal: boolean
  filesData: File[]
  setFilesData: StateAction<File[]>
  uploadFiles: (e: React.ChangeEvent<HTMLInputElement>) => void
  removeFile: (event: string) => void
  handleSelectFile: (selectedFileId: string) => void
  selectedFile: null | any
}

export interface ChatProviderProps {
  children: React.ReactNode
}
