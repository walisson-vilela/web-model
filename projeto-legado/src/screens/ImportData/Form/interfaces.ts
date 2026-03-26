import React from 'react'

import { SetState } from '../../interfaces'
import { FormStateInterface } from '../interfaces'

export interface FormProps {
  form: [
    FormStateInterface,
    React.Dispatch<React.SetStateAction<FormStateInterface>>,
  ]
  reload: SetState<boolean>
}

export type { FormStateInterface } from '../interfaces'
