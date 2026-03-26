import { MwButton } from '@mw-kit/mw-ui'

import Modal from '../../../components/MwModal'

import Manager from './Manager'
import { Item } from './interfaces'

interface AssociatedPDVsProps {
  item: Item
  title?: string | JSX.Element
  closeModal: () => void
}

const AssociatedPDVs = (props: AssociatedPDVsProps) => {
  const { item, title, closeModal } = { ...props }

  return (
    <Modal.Modal size='large' open className='default-large-modal'>
      <Modal.Header color='blue'>PDVs Associados</Modal.Header>

      <Modal.Body $paddingBottom='0'>
        <Manager title={title} segment={item} />
      </Modal.Body>

      <Modal.Footer>
        <MwButton
          type='button'
          content='OK'
          color='blue'
          onClick={closeModal}
        />
      </Modal.Footer>
    </Modal.Modal>
  )
}

export default AssociatedPDVs
