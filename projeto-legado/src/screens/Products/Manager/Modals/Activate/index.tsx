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

interface IActive {
  products: BodyInterface[]
  close: () => void
  reload: () => void
}

const Activate = (props: IActive) => {
  const { products, close, reload } = props

  const [isLoading, setIsLoading] = useState(false)

  return (
    <Modal.Modal open size='tiny'>
      <Modal.Header>
        Ativar Produto{products.length > 1 ? 's' : ''}
      </Modal.Header>

      <Modal.Body>
        {products.length === 1 ? (
          <div>
            Você deseja ativar "<b>{products[0].name}</b>" ?
          </div>
        ) : (
          <div>
            Você deseja ativar os "<b>{products.length} produtos </b>"
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
          content='Ativar'
          onClick={async () => {
            setIsLoading(true)
            try {
              const ids = products.map((checked) => checked.id)
              await toggleStatus(true, ids)
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

export default Activate
