export interface IFormType {
  name: string
}

export interface IFormModal {
  setOpen: Function
  editData?: IFormType & { id: number }
  reload: Function
}
