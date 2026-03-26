import { useCallback, useState } from 'react'

import { MwButton, MwInput } from '@mw-kit/mw-ui'
import toast from 'react-hot-toast'

import Modal from '../../../../../../../../../../../components/MwModal'
import {
  ErrorStyle,
  ToasterContent,
} from '../../../../../../../../../../../components/Toaster'

import { Label } from './styled'

interface IConfirmRejectionModal {
  onConfirm: () => Promise<void>
  setSkipRejectionConfirm: React.Dispatch<React.SetStateAction<boolean>>
  closeModal: () => void
}

const ConfirmRejectionModal = (props: IConfirmRejectionModal) => {
  const { onConfirm, setSkipRejectionConfirm, closeModal } = props

  const [checked, setChecked] = useState(false)
  const [loading, setLoading] = useState(false)

  const onClickConfirm = useCallback(async () => {
    setLoading(true)
    try {
      await onConfirm()
      setSkipRejectionConfirm(checked)
      closeModal()
    } catch (e) {
      console.error(e)
      toast(<ToasterContent color='error' />, ErrorStyle)
      setLoading(false)
    }
  }, [onConfirm, checked])

  return (
    <Modal.Modal open size='tiny' style={{ width: '499px' }}>
      <Modal.Header>Reprovar</Modal.Header>

      <Modal.Body>
        Ao reprovar o PDV, a audoria será removida e uma nova auditoria será
        solicitada automaticamente. Deseja Reprovar a auditoria?
      </Modal.Body>

      <Modal.Footer>
        <div
          style={{
            textAlign: 'left',
          }}
        >
          <MwInput
            type='checkbox'
            label={<Label>Não mostrar essa mensagem novamente.</Label>}
            onChange={(e) => {
              setChecked(e.target.checked)
            }}
          />
        </div>

        <MwButton onClick={closeModal} type='button' appearance='borderless'>
          Cancelar
        </MwButton>

        <MwButton
          onClick={onClickConfirm}
          type='button'
          color='warningRed'
          loading={loading}
        >
          Reprovar
        </MwButton>
      </Modal.Footer>
    </Modal.Modal>
  )
}

export default ConfirmRejectionModal
