import { createContext, useContext } from 'react'

import { ControlPanelContext } from './interfaces'

const Context = createContext({} as ControlPanelContext)

export const useControlPanelContext = () => useContext(Context)

export default Context.Provider
