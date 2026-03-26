import { selectedForm } from '.'

export interface SelectFormsProps {
  type: 'form' | 'local' | 'channel' | 'pdv' | 'product' | 'user'
  selectedItems: selectedForm
  setSelectedItems: React.Dispatch<React.SetStateAction<selectedForm>>
}
