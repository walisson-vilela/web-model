import type { WorkShift } from '../../../types'
import { BodyInterface } from '../../interface'

export type User = {
  id: number
  name: string
  role: {
    id: number
    name: string
  }
  person: {
    registration: string
    pis: string | null
  }
}

export interface UserTransferContext {
  left: [User[], React.Dispatch<React.SetStateAction<User[]>>]
  right: [
    WorkShift | null,
    React.Dispatch<React.SetStateAction<WorkShift | null>>,
  ]
  data: BodyInterface
  reload: () => void
  loading: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

export interface ITransferUsers {
  onClose: () => void
  item: BodyInterface
  reload: () => void
}

export type { WorkShift } from '../../../types'
