import { createContext, useContext } from 'react'

import { RouteTabProvider } from '../../../../routes/types'
import { EmptyManagerProps, ManagerProps } from '../../../../screens/interfaces'
import useManagerProps from '../../../../utils/hooks/useManagersProps'

interface Persist {
  managerProps: ManagerProps
}
const Context = createContext<Persist>({
  managerProps: EmptyManagerProps,
})

export const AuditsProvider: RouteTabProvider = (props) => {
  const { getManagerProps } = useManagerProps(1)
  return (
    <Context.Provider
      value={{
        managerProps: getManagerProps(0),
      }}
      children={props.children}
    />
  )
}

const useAuditsContext = () => useContext(Context)

export default useAuditsContext
