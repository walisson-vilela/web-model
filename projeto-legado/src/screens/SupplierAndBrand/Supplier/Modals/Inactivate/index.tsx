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
  suppliers: BodyInterface[]
  close: () => void
  reload: () => void
}

const Inactive = (props: IInactive) => {
  const {
    suppliers,
    close,

    reload,
  } = props

  const [isLoading, setIsLoading] = useState(false)

  return (
    <Modal.Modal open size='tiny'>
      <Modal.Header>
        Inativar Fabricante{suppliers.length > 1 ? 's' : ''}
      </Modal.Header>

      <Modal.Body>
        {suppliers.length > 1 ? (
          <div>
            Você deseja inativar os{' '}
            <b>{suppliers.length} Fabricantes selecionados</b>?
          </div>
        ) : (
          <div>
            Você deseja inativar o Fabricante <b>{suppliers[0].name}?</b>
          </div>
        )}

        <div>Esta ação inativa também todas as marcas na hierarquia.</div>
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
                suppliers.map((checked) => checked.id),
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

export default Inactive
