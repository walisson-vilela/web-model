import { useState } from 'react'

import { MwButton } from '@mw-kit/mw-ui'

import GridSelector from '../../../../../components/GridSelector'
import Modal from '../../../../../components/MwModal'

import ConfirmModal from './components/ConfirmationModal'
import useLeft from './components/Left'
import useRight from './components/Right'
import { Provider } from './context'
import { IPDVTransfer, PDV, Typology } from './interfaces'

const PDVTransfer = (props: IPDVTransfer) => {
  const { onClose, typology, reload } = props

  const [isOpen, setIsOpen] = useState(false)
  const [left, setLeft] = useState<PDV[]>([])
  const [right, setRight] = useState<Typology | null>(null)

  const onSave = () => {
    setIsOpen(true)
  }

  return (
    <Provider
      value={{
        left: [left, setLeft],
        right: [right, setRight],
        typology,
      }}
    >
      <Modal.Modal size='large' open>
        <Modal.Header color='blue' content='Transferir PDVs' />

        <GridSelector.Container left={useLeft} right={useRight} />

        <Modal.Footer>
          <MwButton
            size='large'
            appearance='borderless'
            type='button'
            onClick={onClose}
            children='Cancelar'
          />

          <MwButton
            size='large'
            type='button'
            disabled={left.length < 1 || !right}
            onClick={onSave}
            children='Confirmar'
          />
        </Modal.Footer>
      </Modal.Modal>

      <ConfirmModal
        onSuccess={() => {
          onClose()
          reload()
        }}
        onClose={() => setIsOpen(false)}
        isOpen={isOpen}
      />
    </Provider>
  )
}
export default PDVTransfer
