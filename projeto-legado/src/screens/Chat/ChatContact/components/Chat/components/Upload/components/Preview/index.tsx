import React from 'react'

import { FiFileText } from 'react-icons/fi'

import * as S from './styles'

interface PreviewProps {
  file: any
}

const Preview = (props: PreviewProps) => {
  const { file } = props

  return (
    <S.Container>
      {file.type.includes('image') ? (
        <S.Icon type='image'>
          <img src={URL.createObjectURL(file)} />
        </S.Icon>
      ) : (
        <S.Icon type='file'>
          <FiFileText size={60} />
          <span> Visualização Indisponível </span>
        </S.Icon>
      )}
    </S.Container>
  )
}

export default Preview
