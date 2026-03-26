import { createContext } from 'react'

import { AddedItemProps } from './interface'

interface FormContextProps {
  selectedItems: AddedItemProps
  setSelectedItems: React.Dispatch<React.SetStateAction<AddedItemProps>>
}

export const FormContext = createContext({} as FormContextProps)
