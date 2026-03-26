import React from 'react'

import { MwGrid } from '@mw-kit/mw-ui'

interface IColDetails {
  style?: React.CSSProperties
  children: React.ReactNode
  width:
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'
    | '10'
    | '11'
    | '12'
    | 'auto'
}

const CollDetails = ({ children, width, style }: IColDetails) => {
  return (
    <MwGrid.Col style={{ ...style }} width={width}>
      {children}{' '}
    </MwGrid.Col>
  )
}

export default CollDetails
