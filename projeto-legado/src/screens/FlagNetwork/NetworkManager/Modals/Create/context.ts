import React from 'react'

import { Context } from './interfaces'

const CreateContext = React.createContext({} as Context)

const useCreateContext = () => React.useContext(CreateContext)

export const Provider = CreateContext.Provider

export default useCreateContext
