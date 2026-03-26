import React from 'react'

import type { ContextInterface } from './interfaces'

const Provider = React.createContext<ContextInterface>({} as ContextInterface)

export const useContext = () => React.useContext(Provider)

export default Provider
