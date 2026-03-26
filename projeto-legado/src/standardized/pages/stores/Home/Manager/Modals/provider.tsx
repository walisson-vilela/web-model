import { createContext, useContext } from 'react'

import { ModalState } from '../../../../../../components/MwModal'
import { BodyInterface } from '../interfaces'

interface IPdvModals {
  checkeds: BodyInterface[]
  setLoading: (value: React.SetStateAction<boolean>) => void
  setModal: (value: React.SetStateAction<ModalState>) => void
  reload: () => void
  toggleStatus(status: boolean, ids: number[]): Promise<boolean>
  deleteMultiple(ids: number[]): Promise<boolean>
  submitToAudit(status: null, ids: number[]): Promise<boolean>
}

const ModalPdvContext = createContext({} as IPdvModals)

export default ModalPdvContext

export const useModalPdv = () => useContext(ModalPdvContext)
