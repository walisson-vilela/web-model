import React from 'react'

import type { Card } from '../../components/types'
import type { Events } from '../Form/types'

interface ExclusionListContext {
  card: Card
  loading: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  getData: () => void
  search: [string, React.Dispatch<React.SetStateAction<string>>]
  eventsList: [Events[], React.Dispatch<React.SetStateAction<Events[]>>]
  selected: [Events | null, React.Dispatch<React.SetStateAction<Events>>]
  selectedIndex: [number, React.Dispatch<React.SetStateAction<number>>]
  originals: [Events[], React.Dispatch<React.SetStateAction<Events[]>>]
  active: [number, React.Dispatch<React.SetStateAction<number>>]
  original: Events | null
}

export const ExclusionManagerContext = React.createContext(
  {} as ExclusionListContext,
)

const useExclusionListManagerContext = () =>
  React.useContext(ExclusionManagerContext)

export default useExclusionListManagerContext
