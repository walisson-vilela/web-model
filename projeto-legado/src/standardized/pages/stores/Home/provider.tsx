import React from 'react'

import { RouteTabProvider } from '../../../../routes/types'
import { EmptyManagerProps, ManagerProps } from '../../../../screens/interfaces'
import { useManagerProps } from '../../../../utils/hooks'

const Context = React.createContext<{ managerProps: ManagerProps }>({
  managerProps: EmptyManagerProps,
})

const useContext = () => React.useContext(Context)

export const Provider: RouteTabProvider = (props) => {
  const { getManagerProps } = useManagerProps(1)
  const managerProps = getManagerProps(0)

  return <Context.Provider value={{ managerProps }} children={props.children} />
}

export default useContext
