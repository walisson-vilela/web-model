export enum ISOs {
  AR = 'ar',
  BR = 'br',
  CL = 'cl',
  ES = 'es',
  US = 'us',
  MX = 'mx',
  PY = 'py',
  PT = 'pt',
  UY = 'uy',
}

type ISO = `${ISOs}`

export interface Country {
  name: string
  iso: ISO
  ddi: number
  placeholder?: string
  validation?: RegExp | ((value: string) => boolean)
  charLimit: number
  mask?: (value: string) => string
}

export type DropdownDirection = 'top' | 'bottom'
