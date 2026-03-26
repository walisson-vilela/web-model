import { createContext } from 'react'

interface ContextProps {
  setNewGroupTab: React.Dispatch<React.SetStateAction<boolean>>
}

const ContactsContext = createContext({} as ContextProps)

export default ContactsContext
