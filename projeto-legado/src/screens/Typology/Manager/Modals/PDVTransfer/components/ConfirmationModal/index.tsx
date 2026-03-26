import { useCallback, useState } from 'react'

import { MwButton } from '@mw-kit/mw-ui'
import toast from 'react-hot-toast'

import Modal from '../../../../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../../../components/Toaster'
import useContext from '../../context'
import { transferPDVs } from '../../service'

interface IConfirmModal {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

const ConfirmModal = (props: IConfirmModal) => {
  const { onClose, isOpen, onSuccess } = props

  const {
    left: [left],
    right: [right],
    typology,
  } = useContext()

  const [loading, setLoading] = useState(false)

  const onConfirm = useCallback(async () => {
    if (left.length < 1 || !right) return

    setLoading(true)
    try {
      await transferPDVs(
        left.map((e) => e.id),
        right.id,
      )

      toast(<ToasterContent color='normal' />, SuccessStyle)

      onSuccess()
    } catch (e) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    }

    setLoading(false)
  }, [left, right])

  if (!right || left.length < 1) return null

  return (
    <Modal.Modal size='tiny' open={isOpen} centered={true}>
      <Modal.Header color='white' content='Transferir Tipologia' />

      <Modal.Body>
        <div>
          Você está alterando{' '}
          <b>
            {left.length} PDV{left.length > 1 ? 's' : ''}
          </b>{' '}
          associado{left.length > 1 ? 's' : ''} à tipologia{' '}
          <b>{typology.name}</b> para <b>{right.name}</b>. Deseja confirmar?
        </div>
      </Modal.Body>

      <Modal.Footer>
        <MwButton
          type='button'
          appearance='borderless'
          content='Cancelar'
          {...(loading ? { disabled: true } : { onClick: onClose })}
          size='large'
        />

        <MwButton
          loading={loading}
          type='button'
          content='Confirmar'
          size='large'
          onClick={onConfirm}
        />
      </Modal.Footer>
    </Modal.Modal>
  )
}
export default ConfirmModal
