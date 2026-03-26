import { MwButton } from '@mw-kit/mw-ui'

import Modal from '../../../../../../../../../../../../components/MwModal'

interface INotification {
  onClose: () => void
  setOcupation: () => void
}

const Notification = (props: INotification) => {
  const { onClose, setOcupation } = props
  return (
    <Modal.Modal open size='tiny'>
      <Modal.Header color='white'>Notificação</Modal.Header>

      <Modal.Body>
        <div>
          Ao substituir o tipo de atuação, os dados configurados no regional
          serão perdidos.
        </div>
        <div>Deseja Continuar?</div>
      </Modal.Body>

      <Modal.Footer>
        <MwButton
          content='Cancelar'
          appearance='borderless'
          type='button'
          onClick={onClose}
        />
        <MwButton content='Sim' type='button' onClick={setOcupation} />
      </Modal.Footer>
    </Modal.Modal>
  )
}

export default Notification
