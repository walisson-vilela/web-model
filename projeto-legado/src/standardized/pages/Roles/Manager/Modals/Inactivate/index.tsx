import React, { useState } from 'react'

import toast from 'react-hot-toast'

import Modal from '../../../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../../components/Toaster'
import { BodyInterface } from '../../interfaces'
import { toggleRolesStatus } from '../../service'

interface IInactivateModal {
  checkeds: BodyInterface[]
  isNotActivate: boolean
  onClosed: () => void
  reload: () => void
}

const InactivateModal = (props: IInactivateModal) => {
  const { onClosed, checkeds, reload, isNotActivate } = props

  const [loading, setLoading] = useState<boolean>(false)

  const onActivate = async () => {
    setLoading(true)

    try {
      await toggleRolesStatus(
        'I',
        checkeds.map((checked) => checked.id),
      )

      toast(<ToasterContent color='normal' />, SuccessStyle)
      reload()

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
      <Modal.Header>Inativar Função</Modal.Header>
      <Modal.Body>
        {
          <React.Fragment>
            {isNotActivate && (
              <div>
                Vocẽ não pode Inativar funções Master ou que tenham usuários
                associados ou estejam em uma hierarquia.
              </div>
            )}
            {checkeds.length === 1 ? (
              <div>
                Deseja Inativar a Função <b>{checkeds[0].name}</b> selecionada?
              </div>
            ) : (
              <div>
                Deseja Inativar as <b>{checkeds.length}</b> Funções
                Selecionadas?
              </div>
            )}
          </React.Fragment>
        }
      </Modal.Body>
      <Modal.Footer
        actions={[
          {
            appearance: 'borderless',
            content: 'Cancelar',
            onClick: onClosed,
          },
          {
            color: 'red',
            content: 'Inativar',
            onClick: onActivate,
            loading: loading,
          },
        ]}
        buttonType='MwButton'
      />
    </Modal.Modal>
  )
}

export default InactivateModal
