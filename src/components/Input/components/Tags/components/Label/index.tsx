import React from 'react'

import type { LabelProps } from './interfaces'
import * as S from './styles'

const Label = ({ required, ...props }: LabelProps) => {
  return props.children ? <S.Label {...props} $required={required} /> : null
}

export default Label
