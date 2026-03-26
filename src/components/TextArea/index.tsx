import React from 'react'

import type { TextAreaProps } from './interfaces'
import * as S from './styles'

const TextArea = ({
  width,
  height,
  ...props
}: TextAreaProps): JSX.Element => {
  return <S.Container {...props} $width={width} $height={height} />
}

export default TextArea
