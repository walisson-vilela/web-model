import React from 'react'

import type { MwTextAreaProps } from './interfaces'
import * as S from './styles'

const TextArea = ({
  width,
  height,
  ...props
}: MwTextAreaProps): JSX.Element => {
  return <S.Container {...props} $width={width} $height={height} />
}

export default TextArea
