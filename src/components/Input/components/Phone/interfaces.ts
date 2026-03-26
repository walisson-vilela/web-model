import type { InputProps } from '../Input/interfaces'

export interface Country {
  name: string
  // eslint-disable-next-line no-use-before-define
  iso: keyof Countries
  ddi: number
  placeholder?: string
  validation?: RegExp | ((value: string) => boolean)
  charLimit: number
  mask?: (value: string) => string
}

export type Countries = {
  ar: Country
  br: Country
  cl: Country
  es: Country
  us: Country
  mx: Country
  py: Country
  pt: Country
  uy: Country
}

export interface PhoneProps
  extends Omit<
    InputProps,
    'type' | 'mask' | 'placeholder' | 'icon' | 'setValue'
  > {
  type: 'phone'
  setValue: (value: string) => void
  value?: string
  placeholder?: Partial<{ [k in keyof Countries]: string }>
}

export interface Details {
  country: Country
  masked: string
  value: string
  withDDI: string
  valid: boolean
}

export interface IconProps {
  country: [Country, React.Dispatch<React.SetStateAction<Country>>]
  open: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  disabled?: boolean
}
