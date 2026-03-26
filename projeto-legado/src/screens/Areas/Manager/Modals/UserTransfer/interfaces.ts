import { Hierarchy } from '../../../types'
import { BodyInterface } from '../../interfaces'

export type User = {
  id: number
  name: string | null
  role_name: string | null
}

export type Region = {
  id: number
  name: string | null
}

export interface UserTransferContext {
  left: [User[], React.Dispatch<React.SetStateAction<User[]>>]
  right: [Region | null, React.Dispatch<React.SetStateAction<Region | null>>]
  data: BodyInterface
  hierarchy: Hierarchy
}

export interface UserTransferProps {
  close: () => void
  reload: () => void
  data: BodyInterface
  hierarchy: Hierarchy
}
