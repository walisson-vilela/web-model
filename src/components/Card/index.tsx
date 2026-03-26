import React from 'react'

import type { CardProps } from './interfaces'
import * as S from './styled'

const Card = ({ borderType, size, ...rest }: CardProps) => {
  return <S.Container $borderType={borderType} $size={size} {...rest} />
}

export default Card
