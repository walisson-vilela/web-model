import React, { createContext } from 'react'

import { UserTransferContext } from './interfaces'

const Context = createContext({} as UserTransferContext)

export const { Provider } = Context

const useContext = () => React.useContext(Context)

export default useContext
