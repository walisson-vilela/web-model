import React from 'react'

import { BodyInterface } from '../../tabs/interfaces'

type Context = {
  loading: boolean
  data: BodyInterface
}

const ManageGroupingContext = React.createContext({} as Context)

const useManageGroupingContext = () => React.useContext(ManageGroupingContext)

export const ManageGroupingProvider = ManageGroupingContext.Provider

export default useManageGroupingContext
