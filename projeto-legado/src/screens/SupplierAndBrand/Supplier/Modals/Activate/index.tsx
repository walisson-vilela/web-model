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
  suppliers: BodyInterface[]
  close: () => void
  reload: () => void
  isInvalid: boolean
}

const Active = (props: IActive) => {
  const { suppliers, close, isInvalid, reload } = props

  const [isLoading, setIsLoading] = useState(false)

  return (
    <Modal.Modal open size='tiny'>
      <Modal.Header>
        Ativar Fabricante{suppliers.length > 1 ? 's' : ''}
      </Modal.Header>

      <Modal.Body>
        {isInvalid && (
          <div>
            Para ativar o <b>Fabricante</b> é necessário antes definir a visão
            das Marcas.
          </div>
        )}

        {suppliers.length === 1 ? (
          <div>
            Deseja ativar o Fabricante <b>{suppliers[0].name}</b> selecionado?
          </div>
        ) : (
          <div>
            Deseja ativar os <b>{suppliers.length}</b> Fabricantes selecionados?
          </div>
        )}

        <div>Esta ação ativa também todas as Marcas associadas.</div>
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
          color='blue'
          onClick={async () => {
            setIsLoading(true)
            try {
              const suppliersId = suppliers.map((checked) => checked.id)
              await toggleStatus(true, suppliersId)
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

export default Active
