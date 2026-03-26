import { BodyInterface } from '../../interfaces'

export interface CreateProps {
  editData?: BodyInterface
  close: () => void
  reload: () => void
}

export interface FormInterface {
  name: string
  code: string
}
