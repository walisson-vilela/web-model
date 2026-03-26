import type React from 'react'

import type { SpacingOrZero, Spacings } from '../../../../interfaces'
import type {
  ColorOptions,
  OpacitiyOptions,
} from '../../../../theme/interfaces'
import type { HorizontalAligns, VerticalAligns } from '../../interfaces'

type Widths =
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

export interface BaseColProps {
  width?: Widths
  spacing?: SpacingOrZero | Spacings
  align?: {
    self?: {
      horizontal?: Exclude<HorizontalAligns, 'around' | 'between'>
      vertical?: VerticalAligns
    }
    content?: {
      horizontal?: HorizontalAligns
      vertical?: VerticalAligns
    }
    text?: 'center' | 'left' | 'right' | 'justify'
  }
  spacingAround?: boolean
  bordered?: true
  hover?: true | ColorOptions | [ColorOptions, OpacitiyOptions]
  pointer?: true
  ellipsis?: true
}

export interface ColProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'width'>,
    BaseColProps {
  backgroundColor?: ColorOptions | [ColorOptions, OpacitiyOptions]
  fontColor?: ColorOptions | [ColorOptions, OpacitiyOptions]
}

export type StyledColProps = {
  $width?: ColProps['width']
  $spacing?: ColProps['spacing']
  $spacingAround?: ColProps['spacingAround']
  $align?: ColProps['align']
  $bordered?: ColProps['bordered']
  $fontColor?: ColProps['fontColor']
  $backgroundColor?: ColProps['backgroundColor']
  $hover?: ColProps['hover']
  $pointer?: ColProps['pointer']
}
