import React from 'react'

import { ContextInterface } from './interfaces'

export const Provider = React.createContext<ContextInterface>(
  {} as ContextInterface,
)

const useContext = () => React.useContext(Provider)

export default useContext
