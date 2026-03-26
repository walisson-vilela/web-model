export interface ConfirmationProps {
  status: 'A' | 'I'
  id: number
  closePopUp: () => void
  handleRemoveConfirmation: (id: number) => Promise<boolean>
}
