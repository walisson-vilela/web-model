import { useCallback, useState } from 'react'

import { MwButton } from '@mw-kit/mw-ui'
import toast from 'react-hot-toast'

import GridSelector from '../../../../../../../components/GridSelector'
import Modal from '../../../../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../../../components/Toaster'
import { saveHierarchySuperior } from '../../../../services'
import { ConfirmationModalTitle } from '../../../ResetDecisionsModal/styles'

import { useLeft, useRight } from './components'
import useTransferUsersContext, { TrasnferUsersProvider } from './context'
import type { TransferUsersProps } from './types'

const TransferUserComponent = () => {
  const {
    hierarchy,
    loadingNodes,
    close,
    superior: [superior],
    users: [users],
  } = useTransferUsersContext()

  const [loading, setLoading] = useState(false)

  const saveUserHierarchyTransfer = useCallback(async () => {
    if (users.length === 0 || !superior) return

    setLoading(true)

    const userIds = users.map((e) => e.user.id)

    try {
      await saveHierarchySuperior(hierarchy.id, userIds, superior.user.id)
      close()
      loadingNodes()
      toast(<ToasterContent color='normal' />, SuccessStyle)
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
      console.error(error)
      setLoading(false)
    }
  }, [users, superior, loadingNodes, close, hierarchy.id])

  return (
    <Modal.Modal
      style={{
        width: '1060px',
        // height: '534px',
        maxWidth: '90vw',
        maxHeight: '90vh',
      }}
      open={true}
    >
      <Modal.Header color='blue'>
        <ConfirmationModalTitle>Transferir Usuário</ConfirmationModalTitle>
      </Modal.Header>

      <GridSelector.Container left={useLeft} right={useRight} />

      <Modal.Footer>
        <MwButton
          content='Cancelar'
          size='small'
          color='white'
          style={{ color: '#A6ACB1' }}
          onClick={close}
        />
        <MwButton
          content='Transferir'
          size='small'
          color='blue'
          onClick={saveUserHierarchyTransfer}
          disabled={users.length === 0 || !superior}
          loading={loading}
        />
      </Modal.Footer>
    </Modal.Modal>
  )
}

const TransferUserModal = (props: TransferUsersProps) => {
  return (
    <TrasnferUsersProvider {...props}>
      <TransferUserComponent />
    </TrasnferUsersProvider>
  )
}

export default TransferUserModal
