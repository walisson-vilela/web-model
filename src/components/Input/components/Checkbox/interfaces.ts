import type React from 'react'

import type { ReactNode } from '../../../../interfaces'
import type { spacings } from '../../../../theme/constants'

interface Padding {
  top?: string | keyof typeof spacings
  left?: string | keyof typeof spacings
  bottom?: string | keyof typeof spacings
  right?: string | keyof typeof spacings
}

// TODO: partial checked (indeterminate)
// https://developer.mozilla.org/en-US/docs/Web/CSS/:indeterminate

export interface LabelContentProps {
  required?: boolean
  invalid?: boolean
  viewMode?: boolean
  padding?: Padding
  bordered?: true
  disabled?: boolean
}

export interface StyledLabelContentProps {
  $required?: LabelContentProps['required']
  $viewMode?: LabelContentProps['viewMode']
}

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>,
    LabelContentProps {
  label?: ReactNode | React.FunctionComponent<LabelContentProps>
  type: 'checkbox'
  width?: string
}

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  $disabled?: boolean
  $required?: boolean
  $invalid?: boolean
  $readOnly?: boolean
  $padding?: Padding
  $bordered?: boolean
  $width?: string
  $viewMode?: boolean
}
