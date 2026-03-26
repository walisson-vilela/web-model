import React from 'react'

import { ValidationError } from 'yup'

interface Lojas {
  status: 'A' | 'I' | ''
}

export interface Values {
  PESSOAS?: null
  PRODUTOS?: null
  LOJAS?: Lojas
  ROTEIROS?: null
  HIERARQUIAS?: null
  MIX?: null
  CALENDARIOS?: null
}

export type SetValueFunc = <K extends keyof Values>(
  key: K,
  value: Values[K],
) => void
export type GetValueFunc = <K extends keyof Values>(key: K) => Values[K]

export interface ContextInterface {
  setValue: SetValueFunc
  getValue: GetValueFunc
}

interface Option<K extends keyof Values> {
  value: K
  label: string
  component?: () => JSX.Element
}

export type Options = {
  [key in keyof Values]: Option<key>
}

export type Errors = {
  [key in keyof Values]: ValidationError
}

export interface pdvProps {
  error: boolean
  setError: React.Dispatch<React.SetStateAction<boolean>>
}
