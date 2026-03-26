import type { Size } from './interfaces'

export const sizes: {
  [key in Size]: {
    fontSize: string
    lineHeight: string
    minWidth: string
    minHeight: string
  }
} = {
  mini: {
    fontSize: '11px',
    lineHeight: '13px',
    minWidth: '51px',
    minHeight: '28px',
  },
  tiny: {
    fontSize: '13px',
    lineHeight: '16px',
    minWidth: '62px',
    minHeight: '34px',
  },
  small: {
    fontSize: '14px',
    lineHeight: '17px',
    minWidth: '74px',
    minHeight: '35px',
  },
  large: {
    fontSize: '16px',
    lineHeight: '19px',
    minWidth: '89px',
    minHeight: '43px',
  },
  big: {
    fontSize: '18px',
    lineHeight: '22px',
    minWidth: '79px',
    minHeight: '52px',
  },
} as const
