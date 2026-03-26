import { useState } from 'react'

import { MwButton, MwLoader } from '@mw-kit/mw-ui'

import GridSelector from '../../../../../../components/GridSelector'
import Modal from '../../../../../../components/MwModal'
import useLicenses from '../../../../../hooks/useLicenses'

import ConfirmModal from './components/ConfirmationModal'
import useLeft from './components/Left'
import useRight from './components/Right'
import { Provider } from './context'
import * as Types from './interfaces'

const UserTransfer = (props: Types.UserTransferProps) => {
  const { close, data, reload } = props

  const [isOpen, setIsOpen] = useState(false)
  const [left, setLeft] = useState<Types.User[]>([])
  const [right, setRight] = useState<Types.Role | null>(null)
  const [loading, setLoading] = useState(false)

  const onSave = () => {
    setIsOpen(true)
  }

  const licenses = useLicenses(setLoading)

  return (
    <Provider
      value={{
        left: [left, setLeft],
        right: [right, setRight],
        data,
        licenses,
      }}
    >
      <Modal.Modal size='large' open>
        {loading && <MwLoader filled zIndex={1000} />}
        <Modal.Header color='blue' content='Transferir Usuários' />

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
          reload()
          close()
        }}
        onClose={() => setIsOpen(false)}
        isOpen={isOpen}
      />
    </Provider>
  )
}
export default UserTransfer
