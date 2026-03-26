import { MwButton } from '@mw-kit/mw-ui'

import Modal from '../../../../../../../components/MwModal'

interface IConfirmation {
  setOpen: () => void
}

const Confirmation = (props: IConfirmation) => {
  const { setOpen } = props
  return (
    <Modal.Modal open size='tiny'>
      <Modal.Header>Tamanho excedido</Modal.Header>
      <Modal.Modal>
        A imagem selecionada excede o limite máximo de tamanho!
      </Modal.Modal>
      <Modal.Modal>
        <MwButton content='OK' color='blue' onClick={setOpen} />
      </Modal.Modal>
    </Modal.Modal>
  )
}

export default Confirmation
