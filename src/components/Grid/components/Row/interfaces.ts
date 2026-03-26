import type React from 'react'

import type { SpacingOrZero, Spacings } from '../../../../interfaces'
import type {
  ColorOptions,
  OpacitiyOptions,
} from '../../../../theme/interfaces'
import type { HorizontalAligns, VerticalAligns } from '../../interfaces'
import type { BaseColProps } from '../Col/interfaces'

export type Striped = {
  [key in 'even' | 'odd']: ColorOptions | [ColorOptions, OpacitiyOptions]
}

export interface BaseRowProps {
  spacing?: SpacingOrZero | Spacings
  horizontalAlign?: HorizontalAligns
  verticalAlign?: VerticalAligns
  spacingAround?: boolean
  striped?: true | Striped | Omit<Striped, 'even'> | Omit<Striped, 'odd'>
  borderless?: true
  hover?: true | ColorOptions | [ColorOptions, OpacitiyOptions]
}

export interface RowProps
  extends React.HTMLAttributes<HTMLDivElement>,
    BaseRowProps {
  cols?: BaseColProps
  backgroundColor?: ColorOptions | [ColorOptions, OpacitiyOptions]
  fontColor?: ColorOptions | [ColorOptions, OpacitiyOptions]
}

export type StyledRowProps = {
  $spacing?: RowProps['spacing']
  $horizontalAlign?: RowProps['horizontalAlign']
  $verticalAlign?: RowProps['verticalAlign']
  $spacingAround?: RowProps['spacingAround']
  $striped?: RowProps['striped']
  $borderless?: RowProps['borderless']
  $hover?: RowProps['hover']
  $backgroundColor?: RowProps['backgroundColor']
  $fontColor?: RowProps['fontColor']
}

export interface ContextInterface {
  cols: BaseColProps
}
