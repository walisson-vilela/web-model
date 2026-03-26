import React from 'react'

import { Form } from '../../../interfaces'

export type PropsInputs = {
  label?: string
} & (
  | {
      name: keyof Pick<Form, 'email' | 'phone'>
    }
  | {
      invalid?: boolean
      value: [string, React.Dispatch<React.SetStateAction<string>>]
    }
)
