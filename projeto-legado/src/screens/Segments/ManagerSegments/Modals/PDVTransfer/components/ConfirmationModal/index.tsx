import { useCallback, useContext, useState } from 'react'

import { MwButton } from '@mw-kit/mw-ui'
import toast from 'react-hot-toast'

import Modal from '../../../../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../../../components/Toaster'
import { transferPDVs as request } from '../../../../services'
import Context from '../../context'

interface ITransferPDVs {
  setConfirmModal: () => void
  setOpenedModal: () => void
  handleLoadData: () => void
}

const ConfirmModal = (props: ITransferPDVs) => {
  const { setConfirmModal, setOpenedModal, handleLoadData } = props
  const { selectedSegment, selectedStore, item } = useContext(Context)

  const [loading, setLoading] = useState(false)

  const onConfirm = useCallback(async () => {
    const parsedStoresList = selectedStore.map((item) => item.id)
    setLoading(true)
    try {
      await request(selectedSegment.id, parsedStoresList)
      toast(<ToasterContent color='normal' />, SuccessStyle)
      setConfirmModal()
      setOpenedModal()
      await handleLoadData()
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading(false)
    }
  }, [selectedSegment, selectedStore])

  if (!selectedSegment || selectedStore.length < 1) return null

  return (
    <Modal.Modal open size='tiny'>
      <Modal.Header color='white'>Transferir Canal</Modal.Header>

      <Modal.Body>
        <div>
          <p>
            Você está alterando <b>{selectedStore.length} PDV(s)</b>{' '}
            associado(s) ao Canal <b>{item.name || '-'}</b> para{' '}
            <b>{selectedSegment.name}</b>. Deseja confirmar?
          </p>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <MwButton
          appearance='borderless'
          type='button'
          content='Cancelar'
          onClick={() => setConfirmModal()}
        />

        <MwButton
          type='button'
          color='blue'
          content='Confirmar'
          onClick={onConfirm}
          loading={loading}
        />
      </Modal.Footer>
    </Modal.Modal>
  )
}
export default ConfirmModal
