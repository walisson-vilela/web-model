import { createContext, useContext } from 'react'

import { RouteTabProvider } from '../../../routes/types'
import { useManagerProps } from '../../../utils/hooks'
import { EmptyManagerProps, ManagerProps } from '../../interfaces'

interface Persist {
  managerProps: ManagerProps
}

const Context = createContext<Persist>({
  managerProps: EmptyManagerProps,
})

export const NotStartedAttendancesProvider: RouteTabProvider = (props) => {
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

const useNotStartedAttendancesContext = () => useContext(Context)

export default useNotStartedAttendancesContext
