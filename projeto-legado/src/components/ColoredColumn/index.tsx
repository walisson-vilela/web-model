import React from 'react'

import { ColoredColumn, DotStatus } from './styles'

interface MwColoredColumnProps {
  content?: number | string
  color?: string
  withDot?: boolean
}

const MwColoredColumn = ({ content, color, withDot }: MwColoredColumnProps) => {
  return (
    <ColoredColumn color={color || 'black'} withDot={withDot || false}>
      {content ? content + '%' : '-'}
      {withDot ? <DotStatus></DotStatus> : ''}
    </ColoredColumn>
  )
}

export default MwColoredColumn
