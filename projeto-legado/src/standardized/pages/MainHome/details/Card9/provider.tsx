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

export const Card9DetailProvider: RouteTabProvider = (props) => {
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

const useCard9DetailContext = () => useContext(Context)

export default useCard9DetailContext
