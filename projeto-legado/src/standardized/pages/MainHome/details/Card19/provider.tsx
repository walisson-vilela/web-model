import { createContext, useContext } from 'react'

import { RouteTabProvider } from '../../../../../routes/types'
import { EmptyManagerProps, ManagerProps } from '../../../../../screens/interfaces'
import { useManagerProps } from '../../../../../utils/hooks'

interface Persist {
  managerProps: ManagerProps
}

const Context = createContext<Persist>({
  managerProps: EmptyManagerProps,
})

export const Card19DetailProvider: RouteTabProvider = (props) => {
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

const useCard19DetailContext = () => useContext(Context)

export default useCard19DetailContext
