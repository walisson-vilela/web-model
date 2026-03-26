export interface ToggleModalStatusI {
  reload: () => void
  setNotificationModal: React.Dispatch<React.SetStateAction<JSX.Element>>
  content: JSX.Element
  status: 'A' | 'I' | 'E'
  toUpdated: number[]
}
