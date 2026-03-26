import React from "react"

const ManageAreaContext = React.createContext({ loading: true })

const useManageAreaContext = () => React.useContext(ManageAreaContext)

export const ManageAreaProvider = ManageAreaContext.Provider

export default useManageAreaContext
