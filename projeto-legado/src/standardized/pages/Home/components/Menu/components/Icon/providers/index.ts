import Downloads from './Downloads'
import { MenuProvider } from './types'

const providers: {
  [K: number]: MenuProvider
} = {
  407: Downloads,
}

const voidProvider: MenuProvider = () => ({ loading: false, bullet: null })

const useProvider = (id: number) => {
  return (providers[id] || voidProvider)()
}

export default useProvider
