import React from 'react'

import MwIcon from '../../components/Icon'

import type { ToasterTypes } from './interfaces'
import * as S from './styles'

const Toast = ({
  size,
  color,
  title,
  description,
  onClose: handlClose,
  ...props
}: ToasterTypes) => {
  return (
    <S.Container {...props} $size={size} $color={color}>
      <S.IconContainer>
        <MwIcon type='feather' icon='x' onClick={handlClose} />
      </S.IconContainer>
      <S.IconContent>
        <h4>{title}</h4>
        <p> {description}</p>
      </S.IconContent>
    </S.Container>
  )
}

export default Toast
