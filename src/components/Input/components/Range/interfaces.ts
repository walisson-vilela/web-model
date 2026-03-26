import type React from 'react'

import type { ReactNode } from '../../../../interfaces'

export interface Marker {
  label: ReactNode
  value: number
}

export interface RangeProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'type' | 'min' | 'max' | 'onChange'
  > {
  type: 'range'
  label?: ReactNode
  minLabel?: ReactNode
  maxLabel?: ReactNode
  invalid?: boolean
  required?: boolean
  hideNavbar?: boolean
  viewMode?: boolean
  value: number
  width?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: number) => void
  setValue: React.Dispatch<React.SetStateAction<number>>
  markers?:
    | {
        min?: number
        max?: number
      }
    | ({
        markers: {
          0: number | Marker
          1: number | Marker
        } & Array<number | Marker>
        position?: 'bottom' | 'top'
      } & (
        | {
            strict: true
          }
        | {
            strict?: false
            min?: number
            max?: number
          }
      ))
}
