import { createContext, useState } from 'react'

import { ModalState } from '../../components/MwModal'

import { selectedForm } from './Modals/create/components/content/components/forms'

interface SurveysContextProps {
  openSelectModal: ModalState
  setOpenSelectModal: React.Dispatch<React.SetStateAction<ModalState>>
  openCreateModal: ModalState
  setOpenCreateModal: React.Dispatch<React.SetStateAction<ModalState>>
  selectedItems: selectedForm
  setSelectedItems: React.Dispatch<React.SetStateAction<selectedForm>>
}

export const SurveysContext = createContext({} as SurveysContextProps)

export const SurveysProvider = ({ children }) => {
  const [openSelectModal, setOpenSelectModal] = useState<ModalState>(null)
  const [openCreateModal, setOpenCreateModal] = useState<ModalState>(null)

  const [selectedItems, setSelectedItems] = useState<selectedForm>({
    form: null,
    local: null,
    channel: null,
    pdv: null,
    product: null,
    user: null,
  })

  return (
    <SurveysContext.Provider
      value={{
        openCreateModal,
        openSelectModal,
        setOpenCreateModal,
        setOpenSelectModal,
        selectedItems,
        setSelectedItems,
      }}
    >
      {children}
    </SurveysContext.Provider>
  )
}
