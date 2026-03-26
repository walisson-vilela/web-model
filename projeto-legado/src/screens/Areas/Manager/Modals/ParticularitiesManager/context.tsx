import React from 'react'

import { Rule } from './interface'

type TContext = {
  loading: boolean
  rule: [
    Rule[keyof Rule],
    React.Dispatch<React.SetStateAction<Rule[keyof Rule]>>,
  ]
}

const ManageAreaContext = React.createContext<TContext>({
  loading: true,
  rule: ['', () => {}],
})

const useManageAreaContext = () => React.useContext(ManageAreaContext)

export const ManageAreaProvider = ManageAreaContext.Provider

export default useManageAreaContext
