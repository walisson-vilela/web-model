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

interface IInactive {
  products: BodyInterface[]
  close: () => void
  reload: () => void
}

const Inactivate = (props: IInactive) => {
  const {
    products,
    close,

    reload,
  } = props

  const [isLoading, setIsLoading] = useState(false)

  return (
    <Modal.Modal open size='tiny'>
      <Modal.Header>
        Inativar Produto{products.length > 1 ? 's' : ''}
      </Modal.Header>

      <Modal.Body>
        {products.length === 1 ? (
          <div>
            Você deseja inativar <b>{products[0].name}</b>?
          </div>
        ) : (
          <div>
            Você deseja inativar os "<b>{products.length} produtos</b>"
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
          content='Inativar'
          color='warningRed'
          onClick={async () => {
            setIsLoading(true)
            try {
              const ids = products.map((checked) => checked.id)
              await toggleStatus(false, ids)

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
