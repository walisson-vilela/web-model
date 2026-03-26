import type React from 'react'

export interface LoginPageState {
  accountId: string
  user: string
  password: string
  rememberMe: boolean
}

export interface LoginFormProps {
  values: LoginPageState
  loading: boolean
  onSubmit: React.FormEventHandler<HTMLFormElement>
  onAccountIdChange: (value: string) => void
  onUserChange: (value: string) => void
  onPasswordChange: (value: string) => void
  onRememberMeChange: (value: boolean) => void
}

export interface LoginFooterProps {
  text: string
}
