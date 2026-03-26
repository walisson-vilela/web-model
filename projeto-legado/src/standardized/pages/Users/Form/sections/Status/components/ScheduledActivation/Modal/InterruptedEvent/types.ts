import { FormInterface as EventsForm } from '../../../../../../../../../../screens/Users/Modals/EventsManager/Tabs/components/Form/interfaces'

export type FormInterface = Pick<EventsForm, 'classification' | 'file'> & {
  activate: boolean
}

export type InterruptEventModalProps = {
  close: () => void
  reload: () => void
  userId: number
  eventId: number
}
