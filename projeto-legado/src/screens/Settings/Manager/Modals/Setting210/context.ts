import React from 'react'

import * as Types from './types'

export const Context = React.createContext<Types.Context>({} as Types.Context)

const useContext = () => React.useContext(Context)

export default useContext
