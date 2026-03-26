import { createContext, useContext, useState } from 'react'

import { ModalState } from '../../components/MwModal'
import { RouteTabProvider } from '../../routes/types'
import { useManagerProps } from '../../utils/hooks'
import { EmptyManagerProps, ManagerProps } from '../interfaces'

interface Lojas {
  status: 'A' | 'I' | ''
}
interface Values {
  PESSOAS?: null
  PRODUTOS?: null
  LOJAS?: Lojas
  ROTEIROS?: null
  HIERARQUIAS?: null
  MIX?: null
  CALENDARIOS?: null
}

interface ExportDataProps {
  managerProps: ManagerProps
  type: [string, React.Dispatch<React.SetStateAction<string>>]
  /** objetos dos parâmetros selecionados */
  selectedItems: [Values, React.Dispatch<React.SetStateAction<Values>>]
  modalState: [
    ModalState | null,
    React.Dispatch<React.SetStateAction<ModalState | null>>,
  ]
  /** estado responsável por armazenar os emails */
  emails: [string[], React.Dispatch<React.SetStateAction<string[]>>]
}

const Context = createContext<ExportDataProps>({
  managerProps: EmptyManagerProps,
  selectedItems: [{}, () => {}],
  type: ['', () => {}],
  modalState: [null, () => {}],
  emails: [[], () => {}],
})

export const ExportDataProvider: RouteTabProvider = (props) => {
  const { getManagerProps } = useManagerProps(1)

  const [selectedItems, setSelectedItems] = useState<Values>({})
  const [type, setType] = useState('PG')
  // estado responsável por armazenar os emails
  const [emails, setEmails] = useState<string[]>([])

  const [confirmModal, setConfirmModal] = useState<ModalState>(null)

  return (
    <Context.Provider
      value={{
        managerProps: getManagerProps(0),
        selectedItems: [selectedItems, setSelectedItems],
        type: [type, setType],
        emails: [emails, setEmails],
        modalState: [confirmModal, setConfirmModal],
      }}
      children={props.children}
    />
  )
}

const useExportDataContext = () => useContext(Context)

export default useExportDataContext
