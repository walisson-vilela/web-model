import React, { createContext } from 'react'

import { ITransferPDV } from './interfaces'

const Context = createContext({} as ITransferPDV)

export const { Provider } = Context

const useContext = () => React.useContext(Context)

export default useContext
