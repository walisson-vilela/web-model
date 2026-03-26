import { MwButton } from '@mw-kit/mw-ui'

import Modal from '../../../../../../../../../../components/MwModal'

interface IUnchekedModal {
  onConfirm: () => void
  onCancel: () => void
}

const UnchekedModal = (props: IUnchekedModal) => {
  const { onConfirm, onCancel } = props

  return (
    <Modal.Modal
      open
      style={{
        width: '500px',
        height: '228px',
        maxHeight: '90vh',
        maxWidth: '90vw',
      }}
    >
      <Modal.Header>Ativar Atributos Internos</Modal.Header>
      <Modal.Body>
        Os usuários associados a esta função irão perder as informações de Área
        de atuação e Superior direto.
      </Modal.Body>
      <Modal.Footer>
        <MwButton
          type='button'
          appearance='borderless'
          children='Cancelar'
          onClick={onCancel}
        />
        <MwButton type='button' children='Ativar' onClick={onConfirm} />
      </Modal.Footer>
    </Modal.Modal>
  )
}

export default UnchekedModal
