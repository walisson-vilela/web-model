import type { TextareaHTMLAttributes } from 'react'

export interface TextAreaProps
  extends Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    'name' | 'width' | 'height' | 'placeholder' | 'disabled'
  > {
  name?: string
  width: string
  height: string
  placeholder?: string
  disabled?: boolean
}

export type StyledTextAreaProps = {
  $width: TextAreaProps['width']
  $height: TextAreaProps['height']
}
