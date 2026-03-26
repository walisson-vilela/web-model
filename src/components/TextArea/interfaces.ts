import type { TextareaHTMLAttributes } from 'react'

export interface MwTextAreaProps
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
  $width: MwTextAreaProps['width']
  $height: MwTextAreaProps['height']
}
