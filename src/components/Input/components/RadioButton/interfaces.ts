import type { ReactNode } from '../../../../interfaces'

export interface RadioButtonProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode
  required?: boolean
  invalid?: boolean
  type: 'radio'
}

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  $disabled?: boolean
  $required?: boolean
  $invalid?: boolean
}
