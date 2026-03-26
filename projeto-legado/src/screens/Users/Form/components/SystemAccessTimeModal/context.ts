import { createContext } from 'react'

import { ModalState } from '../../../../../components/MwModal'

import {
  SystemAccessTime,
  SystemAccessTimeForm,
  WorkDate,
  WorkDateForm,
} from './interfaces'

interface ContextInterface {
  workDate: {
    state: [WorkDate, React.Dispatch<React.SetStateAction<WorkDate>>]
    form: [WorkDateForm, React.Dispatch<React.SetStateAction<WorkDateForm>>]
    isInvalid: (field: keyof WorkDateForm['errors']) => boolean
    onAdd: () => void
    onRemove: (index: number) => void
    reset: () => void
  }
  systemAccessTime: {
    state: [
      SystemAccessTime,
      React.Dispatch<React.SetStateAction<SystemAccessTime>>,
    ]
    form: [
      SystemAccessTimeForm,
      React.Dispatch<React.SetStateAction<SystemAccessTimeForm>>,
    ]
    isInvalid: (field: keyof SystemAccessTimeForm['errors']) => boolean
  }
  setModal: React.Dispatch<React.SetStateAction<ModalState>>
}

const SystemAccessTimeContext = createContext<ContextInterface>(
  {} as ContextInterface,
)

export default SystemAccessTimeContext
