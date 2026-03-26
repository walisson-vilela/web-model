import { createContext } from 'react'

interface FooterContextInterface {
  loading: {
    details: boolean
    thumb: boolean
    rotate: boolean
  }
  setLoading: React.Dispatch<
    React.SetStateAction<{
      details: boolean
      thumb: boolean
      rotate: boolean
    }>
  >
  handleGetImage: () => Promise<void>
  loadDetails: () => Promise<void>
}

const FooterContext = createContext({} as FooterContextInterface)

export default FooterContext
