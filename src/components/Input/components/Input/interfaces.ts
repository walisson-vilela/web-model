import type React from 'react'

import type { ReactNode } from '../../../../interfaces'
import type { IconProps } from '../../../Icon/interfaces'
import type { Mask } from '../../interfaces'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode
  invalid?: boolean
  disabled?: boolean
  loading?: boolean
  mask?: Mask
  icon?: {
    icon: IconProps
    position?: 'left' | 'right'
  }
  clearable?: boolean | (() => void)
  setValue?: (value: string) => void
  onPressEnter?: (event: React.KeyboardEvent<HTMLInputElement>) => void
  htmlDisabled?: boolean
  htmlReadOnly?: boolean
  viewMode?: boolean
  type?: 'text' | 'number' | 'search' | 'email' | 'url' | 'PASSWORD'
  width?: string
  arrows?: boolean
  borderless?: boolean
  paddingless?: boolean
  inputWidth?: string
  children?: React.ReactNode
  dirty?: (() => void) | string
}

export interface StyledLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  $readOnly?: boolean
  $invalid?: boolean
  $disabled?: boolean
  $viewMode?: boolean
  $paddingless?: boolean
  $loading?: boolean
  $iconPosition: Required<InputProps>['icon']['position']
  $iconWidths: (string | number)[]
  $width?: string
}

export interface StyledInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'required'> {
  $invalid?: boolean
  $arrows?: boolean
  $borderless?: boolean
  $paddingless?: boolean
  $width?: string
}

export interface StyledLabelTextProps {
  $required?: boolean
  $viewMode?: boolean
}
