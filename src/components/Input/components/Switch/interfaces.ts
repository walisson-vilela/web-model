import type { ReactNode } from '../../../../interfaces'

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?:
    | ReactNode
    | {
        label?: ReactNode
        before?: ReactNode
        after?: ReactNode
      }
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>
  required?: boolean
  invalid?: boolean
  htmlDisabled?: boolean
  viewMode?: boolean
  breakLabel?: boolean
  type: 'switch'
}

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  $disabled?: boolean
  $invalid?: boolean
}

export interface LabelContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  $required?: boolean
  $viewMode?: boolean
  $keepSpace?: boolean
  $breakLabel?: boolean
}
