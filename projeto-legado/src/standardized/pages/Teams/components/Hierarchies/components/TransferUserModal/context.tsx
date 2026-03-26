import React, { useState } from 'react'

import { HierarchyUser, TransferUsersProps } from './types'

type TransferUsersContextType = TransferUsersProps & {
  users: [
    HierarchyUser[],
    React.Dispatch<React.SetStateAction<HierarchyUser[]>>,
  ]
  superior: [
    HierarchyUser | null,
    React.Dispatch<React.SetStateAction<HierarchyUser | null>>,
  ]
}

const TransferUsersContext = React.createContext<TransferUsersContextType>({
  close: () => {},
  nodeDatum: {} as TransferUsersProps['nodeDatum'],
  users: [[], () => {}],
  superior: [null, () => {}],
  hierarchy: {
    id: 0,
    name: '',
    user_count: 0,
  },
  loadingNodes: async () => {},
})

export const TrasnferUsersProvider = ({
  children,
  ...props
}: React.PropsWithChildren<TransferUsersProps>) => {
  const [users, setUsers] = useState<HierarchyUser[]>([])
  const [superior, setSuperior] = useState<HierarchyUser | null>(null)

  const setUsersMiddleware: typeof setUsers = (value) => {
    setUsers(value)
    setSuperior(null)
  }

  return (
    <TransferUsersContext.Provider
      value={{
        ...props,
        users: [users, setUsersMiddleware],
        superior: [superior, setSuperior],
      }}
      children={children}
    />
  )
}

const useTransferUsersContext = () => React.useContext(TransferUsersContext)

export default useTransferUsersContext
