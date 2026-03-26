import type React from 'react'

import type { ReactNode } from '../../../../interfaces'

import type { InputProps } from './components/Input/interfaces'

export interface LabelProps
  extends Omit<React.HTMLAttributes<HTMLLabelElement>, 'width'> {
  $disabled?: boolean
  $width?: string
}

export interface TagContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  $invalid?: boolean
  $borderless?: boolean
  $paddingless?: boolean
}

export interface TagsProps {
  type: 'tags'
  label?: ReactNode
  width?: string
  disabled?: boolean
  loading?: boolean
  invalid?: boolean
  required?: boolean
  input?: Omit<InputProps, 'onPressEnter' | 'invalid'>
  value: string[]
  setValue: (value: string[]) => void
  validate?: (value: string) => boolean
  onBeforeAdd?: (value: string) => string
  unique?: boolean
  maxTags?: number
  borderless?: boolean
  paddingless?: boolean
  placeholder?: string
  onBlur?: () => void
}
