import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import { v4 } from 'uuid'

import { useModalContext } from '../../Modals/context'

import { ChatContextProps, ChatProviderProps } from './interfaces'

const ChatContext = createContext({} as ChatContextProps)

const ChatProvider = (props: ChatProviderProps) => {
  const { children } = props
  const { handleImageNotificationModal } = useModalContext()
  const [openUploadModal, setOpenUploadModal] = useState(false)
  const [openSideBar, setOpenSideBar] = useState(false)
  const [filesData, setFilesData] = useState<File[]>([])
  const [selectedFile, setSelectedFile] = useState<null | any>(null)

  useEffect(() => {
    if (filesData.length > 0) {
      handleOpenUploadFilesModal(true)
      if (selectedFile === null || selectedFile === undefined) {
        setSelectedFile(filesData[0])
      }
    } else {
      handleOpenUploadFilesModal(false)
    }
  }, [filesData])

  const uploadFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e && e.target.size > 1024 * 25) {
      handleImageNotificationModal()
    } else {
      const previousFiles = e.target.files
      const parsedFiles = Object.values(previousFiles)
      let sizeData = filesData.length
      const addPropriesId = parsedFiles.map((item) => {
        if (sizeData < 15) {
          sizeData++
          return Object.assign(item, { id: v4() })
        }
      })

      const cleanPropries = addPropriesId.filter(
        (prorpies) => prorpies !== undefined,
      )

      setFilesData((prev) => [...prev, ...cleanPropries])
    }
  }

  const removeFile = (id: string) => {
    const files = Array.from(filesData)
    let findIndex = files.findIndex((file: any) => file.id === id)
    const updatedFiles = files.filter((item: any) => item.id !== id)
    setFilesData(updatedFiles)
    if (findIndex !== -1) {
      changeSelectFile(findIndex)
    }
  }

  const changeSelectFile = (index: number) => {
    if (index === 0) {
      setSelectedFile(filesData[1])
    } else {
      const file = filesData[index - 1]
      setSelectedFile(file)
    }
  }

  const handleSelectFile = useCallback(
    (selectedFileId: any) => {
      setSelectedFile(selectedFileId)
    },
    [selectedFile],
  )

  const handleOpenUploadFilesModal = (value: boolean) => {
    setOpenUploadModal(value)
  }

  const handleSideBar = () => {
    setOpenSideBar((prev) => !prev)
  }

  return (
    <ChatContext.Provider
      value={{
        handleOpenUploadFilesModal,
        handleSideBar,
        openSideBar,
        openUploadModal,
        filesData,
        setFilesData,
        uploadFiles,
        removeFile,
        handleSelectFile,
        selectedFile,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const chatContext = useContext(ChatContext)
  if (!chatContext)
    throw new Error('A context precisa ter um componente children')

  return chatContext
}

export default ChatProvider
