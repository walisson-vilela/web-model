export interface formType {
  id?: number | null
  name?: string | null
}

export interface CreateProps {
  setOpen: Function
  editData?: formType
  loadData: Function
}
