import React from 'react'

import { Rule } from '../interface'

type TContext = {
  rule: [Rule, React.Dispatch<React.SetStateAction<Rule>>]
}

const ManageAreaContext = React.createContext<TContext>({
  rule: ['', () => {}],
})

const useManageAreaContext = () => React.useContext(ManageAreaContext)

export const ManageAreaProvider = ManageAreaContext.Provider

export default useManageAreaContext
