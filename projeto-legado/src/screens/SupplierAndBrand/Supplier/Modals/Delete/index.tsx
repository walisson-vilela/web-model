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
import { deleteSuppliers } from '../../services'

interface IDelete {
  suppliers: BodyInterface[]
  close: () => void
  reload: () => void
  isInvalid: boolean
}

const Delete = (props: IDelete) => {
  const { suppliers, close, isInvalid, reload } = props

  const [isLoading, setIsLoading] = useState(false)

  return (
    <Modal.Modal open size='tiny'>
      <Modal.Header>
        Deletar Fabricante{suppliers.length > 1 ? 's' : ''}
      </Modal.Header>
      <Modal.Body>
        {isInvalid && (
          <div>
            Não é permitido deletar os Fabricantes com produtos associados.
          </div>
        )}

        {suppliers.length === 1 ? (
          <div>
            Você deseja realmente deletar o Fabricante{' '}
            <b>{suppliers[0].name}</b>?
          </div>
        ) : (
          <div>
            Deseja deletar os <b>{suppliers.length}</b> Fabricantes
            selecionados?
          </div>
        )}

        <div>A ação também deleta as Marcas abaixo na hierarquia.</div>
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
              await deleteSuppliers(suppliers.map((checked) => checked.id))

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
