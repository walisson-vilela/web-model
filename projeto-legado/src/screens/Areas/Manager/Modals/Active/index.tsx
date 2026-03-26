import React, { useState } from 'react'

import { MwButton } from '@mw-kit/mw-ui'
import toast from 'react-hot-toast'

import Modal, { ModalState } from '../../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../components/Toaster'
import { BodyInterface } from '../../interfaces'
import { toggleStatus } from '../../services'

interface IActiveModal {
  regions: BodyInterface[]
  setOpenedModal: React.Dispatch<React.SetStateAction<ModalState>>
  reload: () => void
}

const ActiveModal = (props: IActiveModal) => {
  const { regions, setOpenedModal, reload } = props
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <Modal.Modal open size='tiny'>
      <Modal.Header>
        Ativar Área{regions.length > 1 ? 's' : ''} de Atuação
      </Modal.Header>
      <Modal.Body>
        {regions.length === 1 ? (
          <div>
            Você deseja Ativar a área <b>{regions[0].name}</b>?
          </div>
        ) : (
          <div>
            Deseja Ativar as <b>{regions.length} áreas</b> selecionadas?
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <MwButton
          type='button'
          content='Cancelar'
          appearance='borderless'
          size='large'
          onClick={() => setOpenedModal(null)}
        />

        <MwButton
          type='button'
          content='Ativar'
          appearance='solid'
          size='large'
          color='blue'
          loading={loading}
          onClick={async () => {
            setLoading(true)

            try {
              await toggleStatus(
                1,
                regions.map((checked) => checked.id),
              )

              toast(<ToasterContent color='normal' />, SuccessStyle)

              reload()
              setOpenedModal(null)
            } catch (error) {
              toast(<ToasterContent color='error' />, ErrorStyle)
              console.error(error)
            } finally {
              setLoading(false)
            }
          }}
        />
      </Modal.Footer>
    </Modal.Modal>
  )
}

export default ActiveModal
