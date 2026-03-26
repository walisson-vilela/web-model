import { createContext } from 'react'

import type { DropdownContextInterface } from './interfaces'

const DropdownContext = createContext<DropdownContextInterface>({
  items: [],
  setOpen: () => {},
  open: false,
  position: 'left bottom',
})

export default DropdownContext
