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
import { deleteMultiple } from '../../services'

interface IDelete {
  products: BodyInterface[]
  close: () => void
  reload: () => void
}

const Delete = (props: IDelete) => {
  const { products, close, reload } = props

  const [isLoading, setIsLoading] = useState(false)

  return (
    <Modal.Modal open size='tiny'>
      <Modal.Header>
        Deletar Produto{products.length > 1 ? 's' : ''}
      </Modal.Header>

      <Modal.Body>
        {products.length === 1 ? (
          <div>
            Você deseja deletar o produto "<b>{products[0].name}</b>"?
          </div>
        ) : (
          <div>
            Você deseja deletar os "<b>{products.length} produtos</b>"
            selecionados?
          </div>
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
          color='warningRed'
          onClick={async () => {
            setIsLoading(true)

            try {
              const ids = products.map((checked) => checked.id)
              await deleteMultiple(ids)

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
