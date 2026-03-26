import { MwButton } from '@mw-kit/mw-ui'

import Modal from '../../../../../../components/MwModal'

interface ISubmitFail {
  setModal: () => void
}

const SubmitFail = (props: ISubmitFail) => {
  const { setModal } = props
  return (
    <Modal.Modal open size='tiny'>
      <Modal.Header color='white'>Notificação</Modal.Header>
      <Modal.Body>
        <div>
          Para salvar é necessário preencher todos os campos obrigatórios deste
          formulário!
        </div>
        <div>Os campos obrigatórios estão sinalizados em vermelho.</div>
      </Modal.Body>
      <Modal.Footer>
        {' '}
        <MwButton
          type='button'
          content='Entendi'
          color='red'
          onClick={() => {
            setModal()
          }}
        />

      </Modal.Footer>
    </Modal.Modal>
  )
}

export default SubmitFail
