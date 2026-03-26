import { BodyInterface } from '../../interfaces'

export interface CreateProps {
  setOpen: Function
  editData?: BodyInterface
  loadData: Function
}

export interface formType {
  id?: number | null
  name: string
  category: 'category' | 'sublevel'
  parent_id: string
}

export interface StatusProcess {
  name: boolean
  parents: boolean
  form: boolean
}
