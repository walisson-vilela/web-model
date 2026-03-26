import type { InputProps } from '../Input/interfaces'

export interface PasswordProps
  extends Omit<
    InputProps,
    'mask' | 'icon' | 'type' | 'clearble'
  > {
  type: 'password'
}
