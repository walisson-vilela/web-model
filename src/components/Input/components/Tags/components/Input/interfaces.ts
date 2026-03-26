import type React from 'react'

import type { Mask } from '../../../../interfaces'

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value'> {
  mask?: Mask
  value: [string, (value: string) => void]
  onPressEnter: React.KeyboardEventHandler<HTMLInputElement>
  invalid?: boolean
  minWidth?: string
}

export interface StyledInputProps {
  $invalid?: InputProps['invalid']
  $minWidth?: InputProps['minWidth']
}
