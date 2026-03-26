export interface DataInterface {
  id: number
  name: string
}

export interface CreateByCopyProps {
  setOpenPopupCopy: (value: React.SetStateAction<boolean>) => void
  setCopyByItem: React.Dispatch<React.SetStateAction<DataInterface>>
}
