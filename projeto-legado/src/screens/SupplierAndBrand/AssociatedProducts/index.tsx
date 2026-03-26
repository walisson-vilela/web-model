import Modal from '../../../components/MwModal'

import Manager from './Manager'
import { ModalProps } from './types'

const AssociatedProducts = (props: ModalProps): JSX.Element => {
  const { onClose } = props

  return (
    <Modal.Modal open size='large'>
      <Modal.Header color='blue'>Lista de Produtos</Modal.Header>

      <Modal.Body $paddingBottom='0'>
        <Manager {...props} />
      </Modal.Body>

      <Modal.Footer
        buttonType='MwButton'
        actions={[
          {
            type: 'button',
            onClick: onClose,
            children: 'OK',
          },
        ]}
      />
    </Modal.Modal>
  )
}

export default AssociatedProducts
