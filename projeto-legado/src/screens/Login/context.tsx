import React, { createContext } from 'react'

import { UseFormReturn } from 'react-hook-form'

import { ModalState } from '../../components/MwModal'

import { ILoginBy, LoginForm } from './interfaces'

interface IInputsLogin {
  method: UseFormReturn<LoginForm>
  loading: [
    { [key: string]: boolean },
    React.Dispatch<
      React.SetStateAction<{
        [key: string]: boolean
      }>
    >,
  ]
  loginType: [ILoginBy, React.Dispatch<React.SetStateAction<ILoginBy>>]
  isSupport: boolean
  modal: [ModalState, React.Dispatch<React.SetStateAction<ModalState>>]
  showAccountInput: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  showAnimation: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

const LoginContext = createContext({} as IInputsLogin)

export const { Provider: LoginProvider } = LoginContext

export const useLoginContext = () => React.useContext(LoginContext)
