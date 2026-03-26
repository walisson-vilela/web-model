import React from 'react'

import type { IndicatorProps } from './interfaces'
import * as S from './styles'

const Indicator = ({
  size,
  type,
  labelColor,
  ...props
}: Partial<IndicatorProps>) => {
  return (
    <S.Container
      {...{
        $size: size || 'small',
        $type: type || 'default',
        $labelColor: labelColor || 'darkBlue',
        ...props,
      }}
    />
  )
}

export default Indicator
