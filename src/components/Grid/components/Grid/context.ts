import React from 'react'

import type { BaseColProps } from '../Col/interfaces'
import type { BaseRowProps } from '../Row/interfaces'

import type { ContextInterface } from './interfaces'

const Provider = React.createContext<ContextInterface>({
  rows: {} as BaseRowProps,
  cols: {} as BaseColProps,
})

export const useContext = () => React.useContext(Provider)

export default Provider
