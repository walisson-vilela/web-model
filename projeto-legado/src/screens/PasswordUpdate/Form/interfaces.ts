import {
  SubmitErrorHandler as HookSubmitErrorHandler,
  SubmitHandler as HookSubmitHandler,
  UseFormReturn,
} from 'react-hook-form'

import { ModalState } from '../../../components/MwModal'

export type Form = {
  password: string
  password_confirm: string
}

export type SubmitHandler = HookSubmitHandler<Form>
export type SubmitErrorHandler = HookSubmitErrorHandler<Form>

export type Context = {
  form: UseFormReturn<Form> & {
    isInvalid: (name: keyof Form) => boolean
  }
  passwordRules: [
    PasswordRule[],
    React.Dispatch<React.SetStateAction<PasswordRule[]>>,
  ]
  passwordFrequency: [number, React.Dispatch<React.SetStateAction<number>>]
  setModal: React.Dispatch<React.SetStateAction<ModalState | null>>
}

export type PasswordRule = {
  code: string
  label: string[]
  success: boolean
}
