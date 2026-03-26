export interface formType {
  id?: number | null
  name?: string | null
  active?: boolean | null
  level?: 1 | null
}

export interface CreateProps {
  setOpen: Function
  editData?: formType
  loadData: Function
}
