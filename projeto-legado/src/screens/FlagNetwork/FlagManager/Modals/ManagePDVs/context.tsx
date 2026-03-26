import { createContext } from 'react'

interface IContext {
  flagId: any
  loading: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}
const Context = createContext<IContext>({} as IContext)

export default Context
