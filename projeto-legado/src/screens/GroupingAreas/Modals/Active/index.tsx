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
import { toggleStatus } from '../../tabs/services'

interface IActiveModal {
  items: BodyInterface[]
  close: () => void
  reload: () => void
}

const ActiveModal = (props: IActiveModal) => {
  const { items, close, reload } = props

  const [loading, setLoading] = useState<boolean>(false)

  return (
    <Modal.Modal open size='tiny'>
      <Modal.Header>
        Ativar Agrupamento{items.length > 1 ? 's' : ''}
      </Modal.Header>

      <Modal.Body>
        {items.length === 1 ? (
          <div>
            Deseja ativar o Agrupamento <b>{items[0].name}</b> selecionado?
          </div>
        ) : (
          <div>
            Deseja ativar os <b>{items.length} Agrupamentos</b> selecionados?
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
          content='Ativar'
          appearance='solid'
          size='large'
          color='blue'
          loading={loading}
          onClick={async () => {
            setLoading(true)

            try {
              await toggleStatus(
                items.map((e) => e.id),
                true,
              )

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

export default ActiveModal
