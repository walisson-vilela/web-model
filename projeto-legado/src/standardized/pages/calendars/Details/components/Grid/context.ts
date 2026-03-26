import React from 'react'

import type * as Types from './types'

export const Context = React.createContext({} as Types.Context)

const useGridContext = () => React.useContext(Context)

export default useGridContext
