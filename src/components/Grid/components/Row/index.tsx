import React from 'react'

import { filterObject } from '../../../../functions/formatters'
import { useContext } from '../Grid/context'

import Provider from './context'
import type { RowProps } from './interfaces'
import * as S from './styles'

const Row = React.forwardRef<HTMLDivElement, RowProps>((props, ref) => {
  const context = useContext()

  const cols = { ...context.cols, ...(props.cols || {}) }

  const rowProps = { ...props, ...context.rows }

  const htmlProps = filterObject<
    RowProps,
    React.HTMLAttributes<HTMLDivElement>
  >(props, [
    'cols',
    'spacing',
    'horizontalAlign',
    'verticalAlign',
    'spacingAround',
    'striped',
    'borderless',
    'hover',
    'backgroundColor',
    'fontColor',
  ])

  return (
    <Provider.Provider value={{ cols }}>
      <S.Row
        ref={ref}
        {...htmlProps}
        $spacing={rowProps.spacing}
        $horizontalAlign={rowProps.horizontalAlign}
        $verticalAlign={rowProps.verticalAlign}
        $spacingAround={rowProps.spacingAround}
        $striped={rowProps.striped}
        $borderless={rowProps.borderless}
        $hover={rowProps.hover}
        $backgroundColor={rowProps.backgroundColor}
        $fontColor={rowProps.fontColor}
      />
    </Provider.Provider>
  )
})

Row.displayName = 'Row'

export default Row
