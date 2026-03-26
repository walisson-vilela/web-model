import React from 'react'

import type * as Types from './types'

export const ExclusionHistoryListContext = React.createContext(
  {} as Types.Context,
)

const useExclusionHistoryListContext = () =>
  React.useContext(ExclusionHistoryListContext)

export default useExclusionHistoryListContext
