import React, { SetStateAction, createContext } from 'react'

type StateAction<T> = React.Dispatch<SetStateAction<T>>
interface ModalContext {
  attempts: number
  setAttempts: StateAction<number>
}

export const Context = createContext({} as ModalContext)
