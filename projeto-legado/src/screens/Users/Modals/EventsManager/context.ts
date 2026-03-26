import { createContext, useContext } from 'react'

import { AppliedFilter } from '@mw-kit/mw-ui/types'

import { ModalState } from '../../../../components/MwModal'

import { Event } from './interfaces'

interface IEventManagerContext {
  close: () => void
  reload: () => void
  paginator: () => void
  onLoadEvents: () => Promise<void>
  appliedFilters: [
    AppliedFilter[],
    React.Dispatch<React.SetStateAction<AppliedFilter[]>>,
  ]
  pagination: [
    {
      page: number
      count: number
      has_next_page: boolean
    },
    React.Dispatch<
      React.SetStateAction<{
        page: number
        count: number
        has_next_page: boolean
      }>
    >,
  ]
  user_id: number
  name: string
  mode: 'future' | 'history'
  loading: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  modal: [ModalState, React.Dispatch<React.SetStateAction<ModalState>>]
  search: [string, React.Dispatch<React.SetStateAction<string>>]
  events: [Event[], React.Dispatch<React.SetStateAction<Event[]>>]
  changes: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  confirmInterrupt: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

export const EventManagerContext = createContext<IEventManagerContext>(
  {} as IEventManagerContext,
)

const useEventManagerContext = () => useContext(EventManagerContext)

export default useEventManagerContext
