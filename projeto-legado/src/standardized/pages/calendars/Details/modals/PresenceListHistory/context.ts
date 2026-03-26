import React from 'react'

import type { PresenceListHistoryContextProps } from './types'

export const PresenceListHistoryContext = React.createContext(
  {} as PresenceListHistoryContextProps,
)

const usePresenceListHistoryContext = () =>
  React.useContext(PresenceListHistoryContext)

export default usePresenceListHistoryContext
