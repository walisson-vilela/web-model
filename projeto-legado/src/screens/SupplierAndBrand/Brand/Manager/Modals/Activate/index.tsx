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

interface IActive {
  brands: BodyInterface[]
  close: () => void
  reload: () => void
}

const Activate = (props: IActive) => {
  const { brands, close, reload } = props

  const [isLoading, setIsLoading] = useState(false)

  return (
    <Modal.Modal open size='tiny'>
      <Modal.Header>Ativar Marca{brands.length > 1 ? 's' : ''}</Modal.Header>

      <Modal.Body>
        {brands.length === 1 ? (
          <React.Fragment>
            <div>
              Você deseja ativar a marca <b>{brands[0].name}</b>?
            </div>
            <div> Ao ativar a marca, o fabricante também será ativado.</div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div>
              Você deseja ativar as <b>{brands.length} marcas</b> selecionadas?
            </div>

            <div>Esta ação também irá ativar os respectivos fabricantes.</div>
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
          content='Ativar'
          color='blue'
          onClick={async () => {
            setIsLoading(true)
            try {
              const suppliersId = brands.map((checked) => checked.id)
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

export default Activate
