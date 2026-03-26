import type { colors } from '../../theme/constants'

import type { Sizes, Types } from './interfaces'

export const sizes: { [key in Sizes]: string } = {
  medium: '15px',
  small: '6px',
  mini: '4px',
} as const

export const types: { [key in Types]: keyof typeof colors } = {
  default: 'warningGray',
  info: 'blue',
  danger: 'warningRed',
  success: 'green',
  warning: 'warningYellow',
  temporary: 'purple',
} as const
