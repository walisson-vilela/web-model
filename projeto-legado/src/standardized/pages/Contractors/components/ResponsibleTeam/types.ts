import { ModalState } from '../../../../../components/MwModal'

export interface AssociatedUser {
  id?: number
  person_id: number
  name: string
  menu_ids: number[]
  role: {
    id: number
    name: string
    master: boolean
  } | null
  administrator: boolean
}

export interface Props {
  value: [
    AssociatedUser[],
    React.Dispatch<React.SetStateAction<AssociatedUser[]>>,
  ]
  setModal: (state: ModalState) => void
  viewMode?: boolean
  typeForm: 'conta' | 'agrupamento'
  name: string
}
