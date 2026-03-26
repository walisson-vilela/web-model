import React from 'react'

import { FiX } from 'react-icons/fi'

import { useChat } from '../../../../context'

import * as S from './styles'

interface IconProps {
  file: any
}

const Icon = (props: IconProps) => {
  const { file } = props
  const { selectedFile, handleSelectFile, removeFile, filesData } = useChat()

  return file.type.includes('image') ? (
    <React.Fragment>
      <S.Container
        onClick={() => handleSelectFile(file)}
        active={selectedFile.id === file.id}
      >
        <S.ImageIcon src={URL.createObjectURL(file)} />
        {selectedFile.id === file.id && (
          <div
            onClick={(e) => {
              e.stopPropagation()
              removeFile(file.id)
            }}
          >
            <FiX />
          </div>
        )}
      </S.Container>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <S.Container
        onClick={() => handleSelectFile(file)}
        active={selectedFile.id === file.id}
      >
        <S.IconFile> Arquivo {file.name}</S.IconFile>
        {selectedFile.id === file.id && (
          <div
            onClick={(e) => {
              e.stopPropagation()
              removeFile(file.id)
            }}
          >
            <FiX />
          </div>
        )}
      </S.Container>
    </React.Fragment>
  )
}

export default Icon
