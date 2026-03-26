import React from 'react'

import { filterObject } from '../../../../functions/formatters'

import Provider from './context'
import type { GridProps, StyledGridProps } from './interfaces'
import * as S from './styles'

const Grid = React.forwardRef<HTMLDivElement, GridProps>((props, ref) => {
  const cols = props.cols || {}
  const rows = props.rows || {}

  const gridProps = filterObject<GridProps, StyledGridProps>(props, [
    'cols',
    'rows',
    'spacing',
    'borderless',
  ])

  return (
    <Provider.Provider value={{ rows, cols }}>
      <S.Grid
        ref={ref}
        {...gridProps}
        $spacing={props.spacing}
        $borderless={props.borderless}
      />
    </Provider.Provider>
  )
})

Grid.displayName = 'Grid'

export default Grid
