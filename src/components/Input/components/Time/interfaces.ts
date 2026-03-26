import type { InputProps } from '../Input/interfaces'

export interface TimeProps
  extends Omit<InputProps, 'type' | 'mask' | 'min' | 'max'> {
  type: 'time'
  seconds?: boolean
  value: string
  min?: string
  max?: string
}
