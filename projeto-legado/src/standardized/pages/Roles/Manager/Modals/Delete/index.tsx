import React, { useState } from 'react'

import toast from 'react-hot-toast'

import Modal from '../../../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../../components/Toaster'
import { BodyInterface } from '../../interfaces'
import { deleteMultiple } from '../../service'

interface IDeleteModal {
  checkeds: BodyInterface[]
  isNotDelete: boolean
  onClosed: () => void
  reload: () => void
}

const DeleteModal = (props: IDeleteModal) => {
  const { onClosed, checkeds, reload, isNotDelete } = props

  const [loading, setLoading] = useState<boolean>(false)

  const onDelete = async () => {
    setLoading(true)

    try {
      await deleteMultiple(checkeds.map((checked) => checked.id))

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
      <Modal.Header>Deletar Função</Modal.Header>
      <Modal.Body>
        {
          <React.Fragment>
            {isNotDelete && (
              <div>
                Vocẽ não pode Deletar funções padrão, ou que tenham usuários
                associados ou estejam em uma hierarquia.
              </div>
            )}
            {checkeds.length === 1 ? (
              <div>
                Deseja Deletar a Função <b>{checkeds[0].name}</b> selecionada?
              </div>
            ) : (
              <div>
                Deseja Deletar as <b>{checkeds.length}</b> Funções Selecionadas?
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
            content: 'Deletar',
            onClick: onDelete,
            loading: loading,
          },
        ]}
        buttonType='MwButton'
      />
    </Modal.Modal>
  )
}

export default DeleteModal
