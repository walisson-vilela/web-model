import React from 'react'

import { useEllipsis } from './functions'
import * as S from './styled'
import type { EllipsisContainerProps } from './types'

const EllipsisContainer = (props: EllipsisContainerProps) => {
  const { lines, ...htmlProps } = props
  return (
    <S.EllipsisContainer
      $lines={lines}
      {...htmlProps}
      {...useEllipsis(props.onMouseOver)}
    />
  )
}

export default EllipsisContainer
