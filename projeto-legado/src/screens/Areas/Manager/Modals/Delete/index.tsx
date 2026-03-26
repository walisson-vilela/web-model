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
import { deleteMultiple } from '../../services'

interface IDeleteModal {
  regions: BodyInterface[]
  setConfirmModal: React.Dispatch<React.SetStateAction<ModalState>>
  reload: () => void
  hasInvalid: boolean
}

const DeleteModal = (props: IDeleteModal) => {
  const { regions, setConfirmModal, reload, hasInvalid } = props
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <Modal.Modal open size='tiny'>
      <Modal.Header>
        Deletar Área{regions.length > 1 ? 's' : ''} de Atuação
      </Modal.Header>

      <Modal.Body>
        {regions.length === 1 ? (
          hasInvalid ? (
            <div>
              Não é permitido Deletar as áreas que contenham vínculos de
              Usuários e ou Roteiros. Você deseja Deletar a área{' '}
              <b>{regions[0].name}</b>?
            </div>
          ) : (
            <div>
              Você deseja Deletar a área <b>{regions[0].name}</b>?
            </div>
          )
        ) : hasInvalid ? (
          <div>
            Não é permitido Deletar as áreas que contenham vínculos de Usuários
            e ou Roteiros. Deseja Deletar as outras{' '}
            <b>{regions.length} áreas</b> selecionadas?
          </div>
        ) : (
          <div>
            Deseja Deletar as <b>{regions.length} áreas</b> selecionadas?
          </div>
        )}
      </Modal.Body>

      <Modal.Footer>
        <MwButton
          type='button'
          content='Cancelar'
          appearance='borderless'
          size='large'
          onClick={() => setConfirmModal(null)}
        />

        <MwButton
          type='button'
          content='Deletar'
          appearance='solid'
          size='large'
          color='red'
          loading={loading}
          onClick={async () => {
            setLoading(true)

            try {
              await deleteMultiple(regions.map((region) => region.id))

              toast(<ToasterContent color='normal' />, SuccessStyle)

              reload()
              setConfirmModal(null)
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

export default DeleteModal
