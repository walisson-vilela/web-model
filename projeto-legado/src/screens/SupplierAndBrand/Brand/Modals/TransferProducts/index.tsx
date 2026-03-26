import { useState } from 'react'

import { MwButton } from '@mw-kit/mw-ui'

import GridSelector from '../../../../../components/GridSelector'
import Modal from '../../../../../components/MwModal'

import ConfirmModal from './components/ConfirmationModal'
import useLeft from './components/Left'
import useRight from './components/Right'
import { Provider } from './context'
import * as Types from './interfaces'

const TransferProducts = (props: Types.TransferProductsProps) => {
  const { close, data, reload } = props

  const [isOpen, setIsOpen] = useState(false)
  const [left, setLeft] = useState<Types.Product[]>([])
  const [right, setRight] = useState<Types.Brand | null>(null)

  const onSave = () => {
    setIsOpen(true)
  }

  return (
    <Provider
      value={{
        left: [left, setLeft],
        right: [right, setRight],
        data,
      }}
    >
      <Modal.Modal size='large' open>
        <Modal.Header color='blue' content='Transferir Produto' />

        <GridSelector.Container left={useLeft} right={useRight} />

        <Modal.Footer>
          <MwButton
            size='large'
            appearance='borderless'
            type='button'
            onClick={close}
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
          close()
          reload()
        }}
        onClose={() => setIsOpen(false)}
        isOpen={isOpen}
      />
    </Provider>
  )
}
export default TransferProducts
