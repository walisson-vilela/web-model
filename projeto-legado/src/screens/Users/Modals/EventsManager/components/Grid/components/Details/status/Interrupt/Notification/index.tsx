import { useCallback, useState } from 'react'

import { MwButton, MwInput } from '@mw-kit/mw-ui'
import toast from 'react-hot-toast'

import Modal from '../../../../../../../../../../../components/MwModal'
import {
  ErrorStyle,
  ToasterContent,
} from '../../../../../../../../../../../components/Toaster'

import { FooterButtons } from './styles'

interface INotificationModal {
  onClose: () => void
  handleRemove: () => Promise<void>
  setConfirmInterrupt: (checked: boolean) => void
}

const NotificationModal = (props: INotificationModal) => {
  const { onClose, handleRemove, setConfirmInterrupt } = props

  const [loading, setLoading] = useState(false)
  const [checked, setChecked] = useState(false)

  const onConfirm = useCallback(async () => {
    setLoading(true)

    try {
      await handleRemove()
      setConfirmInterrupt(!checked)
      onClose()
    } catch (e) {
      console.error(e)
      setLoading(false)
      toast(<ToasterContent color='error' />, ErrorStyle)
    }
  }, [handleRemove, checked])

  return (
    <Modal.Modal open size='tiny'>
      <Modal.Header>Notificação</Modal.Header>

      <Modal.Body>
        <div>
          Ao remover ou interromper um evento, o usuario deixará de ser
          impactado.
        </div>
        <div>Deseja continuar com a ação?</div>
      </Modal.Body>

      <Modal.Footer style={{ justifyContent: 'space-between' }}>
        <MwInput
          label='Não mostrar Novamente'
          type='checkbox'
          checked={checked}
          onChange={(e) => {
            setChecked(e.target.checked)
          }}
        />

        <FooterButtons>
          <MwButton appearance='borderless' onClick={onClose}>
            Cancelar
          </MwButton>

          <MwButton loading={loading} onClick={onConfirm}>
            Sim
          </MwButton>
        </FooterButtons>
      </Modal.Footer>
    </Modal.Modal>
  )
}

export default NotificationModal
