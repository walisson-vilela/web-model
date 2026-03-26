import type React from 'react'

import type { colors } from '../../theme/constants'

export interface LoaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
  color?: string | keyof typeof colors
  bgColor?: string | keyof typeof colors
  size?: string
  borderSize?: string
  filled?: true | string | keyof typeof colors
  zIndex?: number
}

export interface StyledLoaderProps {
  $color?: LoaderProps['color']
  $bgColor?: LoaderProps['bgColor']
  $size?: LoaderProps['size']
  $borderSize?: LoaderProps['borderSize']
  $filled?: LoaderProps['filled']
  $zIndex?: LoaderProps['zIndex']
}
