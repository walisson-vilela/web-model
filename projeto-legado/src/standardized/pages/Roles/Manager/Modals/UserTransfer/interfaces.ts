import useLicenses from '../../../../../hooks/useLicenses'
import { BodyInterface } from '../../interfaces'

export type User = {
  id: number
  name: string | null
  registration: string | null
}

export type Role = Pick<
  BodyInterface,
  | 'id'
  | 'name'
  | 'internal_access'
  | 'internal_access_label'
  | 'access_level_id'
  | 'access_level_label'
  | 'hierarchies'
>

export interface UserTransferContext {
  left: [User[], React.Dispatch<React.SetStateAction<User[]>>]
  right: [Role | null, React.Dispatch<React.SetStateAction<Role | null>>]
  data: BodyInterface
  licenses: ReturnType<typeof useLicenses>
}

export interface UserTransferProps {
  close: () => void
  reload: () => void
  data: BodyInterface
}
