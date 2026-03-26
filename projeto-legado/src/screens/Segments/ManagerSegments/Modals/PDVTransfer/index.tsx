import { useState } from 'react'

import { MwButton } from '@mw-kit/mw-ui'

import GridSelector from '../../../../../components/GridSelector'
import Modal, { ModalState } from '../../../../../components/MwModal'

import ConfirmModal from './components/ConfirmationModal'
import useLeft from './components/Left'
import useRight from './components/Right'
import Context, { ComponentProps } from './context'
import { Segment, Store } from './interfaces'

const TransferPDVs = (props: ComponentProps) => {
  const { setOpenedModal, item, handleLoadData } = props

  const [confirmModal, setConfirmModal] = useState<ModalState>(null)
  const [selectedSegment, setSelectedSegment] = useState<Segment | null>(null)
  const [selectedStore, setSelectedStore] = useState<Store[]>([])

  const handleConfirmation = () => {
    setConfirmModal(
      <ConfirmModal
        handleLoadData={() => handleLoadData()}
        setConfirmModal={() => setConfirmModal(null)}
        setOpenedModal={() => setOpenedModal(null)}
      />,
    )
  }

  return (
    <Context.Provider
      value={{
        item,
        selectedStore,
        selectedSegment,
        setSelectedStore,
        setSelectedSegment,
      }}
    >
      <Modal.Modal
        style={{
          maxWidth: '90vw',
        }}
        open
        size='large'
      >
        <Modal.Header color='blue' content='Transferir PDVs' />

        <GridSelector.Container left={useLeft} right={useRight} />

        <Modal.Footer>
          <MwButton
            size='large'
            appearance='borderless'
            type='button'
            onClick={() => setOpenedModal(null)}
            children='Cancelar'
          />

          <MwButton
            content='Confirmar'
            onClick={handleConfirmation}
            disabled={selectedStore.length === 0 || selectedSegment === null}
            type='button'
          />
        </Modal.Footer>
      </Modal.Modal>
      <Modal modal={confirmModal} />
    </Context.Provider>
  )
}
export default TransferPDVs
