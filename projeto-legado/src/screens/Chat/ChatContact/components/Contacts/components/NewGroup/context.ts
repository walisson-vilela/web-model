import { createContext } from 'react'

interface NewGroupProps {
  setConfigGroupTab: React.Dispatch<React.SetStateAction<boolean>>
  setName: React.Dispatch<React.SetStateAction<string>>
  name: string
}

const NewGroupContext = createContext({} as NewGroupProps)

export default NewGroupContext
