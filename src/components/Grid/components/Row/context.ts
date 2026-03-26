import React from 'react'

import type { BaseColProps } from '../Col/interfaces'

import type { ContextInterface } from './interfaces'

const Provider = React.createContext<ContextInterface>({
  cols: {} as BaseColProps,
})

export const useContext = () => React.useContext(Provider)

export default Provider
