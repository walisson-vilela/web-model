import React, { useState } from 'react'

import { RouteTabProvider } from '../../../../routes/types'
import { EmptyManagerProps, ManagerProps } from '../../../../screens/interfaces'
import { useManagerProps } from '../../../../utils/hooks'

const Context = React.createContext<{
  managerProps: ManagerProps
  showUpdated: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}>({
  managerProps: EmptyManagerProps,
  showUpdated: [true, () => {}],
})

const useContext = () => React.useContext(Context)

export const Provider: RouteTabProvider = (props) => {
  const { getManagerProps } = useManagerProps(1)

  const managerProps = getManagerProps(0)

  const [showUpdated, setShowUpdated] = useState(true)

  return (
    <Context.Provider
      value={{ managerProps, showUpdated: [showUpdated, setShowUpdated] }}
      children={props.children}
    />
  )
}

export default useContext
