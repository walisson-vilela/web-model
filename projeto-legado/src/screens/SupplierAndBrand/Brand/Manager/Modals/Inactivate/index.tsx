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
import { toggleStatus } from '../../services'

interface IInactive {
  brands: BodyInterface[]
  close: () => void
  reload: () => void
}

const Inactivate = (props: IInactive) => {
  const {
    brands,
    close,

    reload,
  } = props

  const [isLoading, setIsLoading] = useState(false)

  return (
    <Modal.Modal open size='tiny'>
      <Modal.Header>Inativar Marca{brands.length > 1 ? 's' : ''}</Modal.Header>

      <Modal.Body>
        {brands.length === 1 ? (
          <React.Fragment>
            <div>
              Você deseja inativar a marca <b>{brands[0].name}</b>?
            </div>
            <div>
              Caso seja a única marca ativa, o fabricante também será inativado.
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div>
              Você deseja inativar as <b>{brands.length} marcas</b>{' '}
              selecionadas?
            </div>

            <div>
              Caso seja a única marca inativa, o respectivo fabricante também
              será inativado.
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
          content='Inativar'
          color='red'
          onClick={async () => {
            setIsLoading(true)
            try {
              await toggleStatus(
                false,
                brands.map((checked) => checked.id),
              )

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

export default Inactivate
