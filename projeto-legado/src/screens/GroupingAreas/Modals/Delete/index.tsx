import { useState } from 'react'

import { MwButton } from '@mw-kit/mw-ui'
import toast from 'react-hot-toast'

import Modal from '../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../components/Toaster'
import { BodyInterface } from '../../tabs/interfaces'

import { deleteMultiple } from './services'

interface IDeleteModal {
  items: BodyInterface[]
  close: () => void
  reload: () => void
}

const DeleteModal = (props: IDeleteModal) => {
  const { items, close, reload } = props

  const [loading, setLoading] = useState<boolean>(false)

  return (
    <Modal.Modal open size='tiny'>
      <Modal.Header>
        Deletar Agrupamento{items.length > 1 ? 's' : ''}
      </Modal.Header>

      <Modal.Body>
        {items.length === 1 ? (
          <div>
            Deseja deletar o Agrupamento <b>{items[0].name}</b> selecionado?
          </div>
        ) : (
          <div>
            Deseja deletar os <b>{items.length} Agrupamentos</b> selecionados?
          </div>
        )}
      </Modal.Body>

      <Modal.Footer>
        <MwButton
          type='button'
          content='Cancelar'
          appearance='borderless'
          size='large'
          onClick={close}
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
              await deleteMultiple(items.map((region) => region.id))

              toast(<ToasterContent color='normal' />, SuccessStyle)

              reload()
              close()
            } catch (error) {
              toast(<ToasterContent color='error' />, ErrorStyle)
              console.error(error)
              setLoading(false)
            }
          }}
        />
      </Modal.Footer>
    </Modal.Modal>
  )
}

export default DeleteModal
