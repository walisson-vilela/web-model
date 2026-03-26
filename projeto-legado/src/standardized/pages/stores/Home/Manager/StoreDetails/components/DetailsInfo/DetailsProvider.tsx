import { createContext } from 'react'

import { ITableDetails } from './interfaces'

const DetailsContext = createContext<ITableDetails>({} as ITableDetails)

export default DetailsContext
