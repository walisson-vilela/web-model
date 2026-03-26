import { useState } from 'react'

import toast from 'react-hot-toast'

import Modal from '../../../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../../components/Toaster'
import { BodyInterface } from '../../interfaces'
import { toggleRolesStatus } from '../../service'

interface IActivateModal {
  checkeds: BodyInterface[]
  onClosed: () => void
  reload: () => void
}

const ActivateModal = (props: IActivateModal) => {
  const { onClosed, checkeds, reload } = props

  const [loading, setLoading] = useState<boolean>(false)

  const onActivate = async () => {
    setLoading(true)

    try {
      await toggleRolesStatus(
        'A',
        checkeds.map((checked) => checked.id),
      )

      toast(<ToasterContent color='normal' />, SuccessStyle)
      reload()
      setLoading(false)
      onClosed()
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
      setLoading(false)
    }
  }

  return (
    <Modal.Modal
      open
      size='tiny'
      style={{
        width: '500px',
        height: '228px',
        maxWidth: '90vw',
        maxHeight: '90vh',
      }}
    >
      <Modal.Header>Ativar Função</Modal.Header>
      <Modal.Body>
        {checkeds.length === 1 ? (
          <div>
            Deseja Ativar a Função <b>{checkeds[0].name}</b> selecionada?
          </div>
        ) : (
          <div>
            Deseja Ativar as <b>{checkeds.length}</b> Funções Selecionadas?
          </div>
        )}
      </Modal.Body>
      <Modal.Footer
        actions={[
          {
            appearance: 'borderless',
            content: 'Cancelar',
            onClick: onClosed,
          },
          {
            color: 'blue',
            content: 'Ativar',
            onClick: onActivate,
            loading: loading,
          },
        ]}
        buttonType='MwButton'
      />
    </Modal.Modal>
  )
}

export default ActivateModal
