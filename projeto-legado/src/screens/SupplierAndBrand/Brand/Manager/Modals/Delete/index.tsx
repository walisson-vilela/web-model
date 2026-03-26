import React, { useState } from 'react'

import { MwButton } from '@mw-kit/mw-ui'
import toast from 'react-hot-toast'

import Modal from '../../../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../../components/Toaster'
import { BodyInterface } from '../../interface'
import { deleteMultiple } from '../../services'

interface IDelete {
  brands: BodyInterface[]
  close: () => void
  reload: () => void
  hasValid: boolean
}

const Delete = (props: IDelete) => {
  const { brands, close, reload, hasValid } = props

  const [isLoading, setIsLoading] = useState(false)

  return (
    <Modal.Modal open size='tiny'>
      <Modal.Header>Deletar Marca{brands.length > 1 ? 's' : ''}</Modal.Header>
      <Modal.Body>
        {hasValid && (
          <div>
            Não é permitido deletar as marcas que possuem produtos associados.
          </div>
        )}
        {brands.length === 1 ? (
          <React.Fragment>
            <div>
              Você deseja realmente deletar a marca <b>{brands[0].name}</b>?
            </div>

            <div>
              Caso seja a única marca ativa, o fabricante será inativado.
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div>
              Você deseja realmente deletar as <b>{brands.length} marcas</b>
              selecionadas?
            </div>
          </React.Fragment>
        )}
      </Modal.Body>
      <Modal.Footer>
        <MwButton
          content='Cancelar'
          type='button'
          appearance='borderless'
          onClick={close}
        />

        <MwButton
          content='Deletar'
          color='red'
          onClick={async () => {
            setIsLoading(true)

            try {
              await deleteMultiple(brands.map((checked) => checked.id))

              close()
              reload()
              toast(<ToasterContent color='normal' />, SuccessStyle)
            } catch (error) {
              console.error(error)
              toast(<ToasterContent color='error' />, ErrorStyle)

              setIsLoading(false)
            }
          }}
          loading={isLoading}
        />
      </Modal.Footer>
    </Modal.Modal>
  )
}

export default Delete
