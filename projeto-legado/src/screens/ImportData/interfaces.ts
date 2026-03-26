import { ModalState } from '../../components/MwModal'

export type FormTypes = 'G' | 'F' | 'OP' | 'SC'

export interface ModalProps {
  setModal: React.Dispatch<React.SetStateAction<ModalState>>
}

export interface FormStateInterface {
  type: FormTypes
  file: File
  settings: { [key: string]: any }
  email: string
  dateTime: string
}
