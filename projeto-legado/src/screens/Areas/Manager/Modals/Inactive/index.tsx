import { useState } from 'react'

import { MwButton } from '@mw-kit/mw-ui'
import toast from 'react-hot-toast'

import Modal from '../../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../components/Toaster'
import { BodyInterface } from '../../interfaces'
import { toggleStatus } from '../../services'

interface IInactiveModal {
  regions: BodyInterface[]
  hasInvalid: boolean
  setOpenedModal: () => void
  reload: () => void
}

const InactiveModal = (props: IInactiveModal) => {
  const { regions, setOpenedModal, reload, hasInvalid } = props
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <Modal.Modal open size='tiny'>
      <Modal.Header>
        Inativar Área{regions.length > 1 ? 's' : ''} de Atuação
      </Modal.Header>
      <Modal.Body>
        {regions.length === 1 ? (
          hasInvalid ? (
            <div>
              Não é permitido Inativar as áreas que contenham vínculos de
              Usuários e ou Roteiros. Você deseja Inativar a área{' '}
              <b>{regions[0].name}</b>?
            </div>
          ) : (
            <div>
              Você deseja Inativar a área <b>{regions[0].name}</b>?
            </div>
          )
        ) : hasInvalid ? (
          <div>
            Não é permitido Inativar as áreas que contenham vínculos de Usuários
            e ou Roteiros. Deseja Inativar as outras{' '}
            <b>{regions.length} áreas</b> selecionadas?
          </div>
        ) : (
          <div>
            Deseja Inativar as <b>{regions.length} áreas</b> selecionadas?
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <MwButton
          type='button'
          content='Cancelar'
          appearance='borderless'
          size='large'
          onClick={setOpenedModal}
        />

        <MwButton
          type='button'
          content='Inativar'
          appearance='solid'
          size='large'
          color='red'
          loading={loading}
          onClick={async () => {
            setLoading(true)

            try {
              await toggleStatus(
                0,
                regions.map((checked) => checked.id),
              )

              toast(<ToasterContent color='normal' />, SuccessStyle)

              reload()
              setLoading(false)
              setOpenedModal()
            } catch (error) {
              toast(<ToasterContent color='error' />, ErrorStyle)
              console.error(error)
            }
          }}
        />
      </Modal.Footer>
    </Modal.Modal>
  )
}

export default InactiveModal
