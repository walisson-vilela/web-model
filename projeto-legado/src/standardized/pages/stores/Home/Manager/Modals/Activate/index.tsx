import React from 'react'

import { MwButton } from '@mw-kit/mw-ui'
import toast from 'react-hot-toast'

import Modal from '../../../../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../../../components/Toaster'
import { numberOrDefault } from '../../../../../../../utils/Formatters'
import { useModalPdv } from '../provider'

const Activate = () => {
  const { checkeds, reload, setLoading, setModal, toggleStatus } = useModalPdv()
  const toUpdate = checkeds.filter((checked) => !checked.status)

  return (
    <Modal.Modal open size='tiny'>
      <Modal.Header children='Ativar PDV' />

      <Modal.Body>
        {toUpdate.length === 1 ? (
          <React.Fragment>
            <div>Você deseja ativar o PDV abaixo:</div>
            <div>
              <b>{toUpdate[0].name}</b>?
            </div>
          </React.Fragment>
        ) : (
          <div>
            Você deseja ativar os <b>{toUpdate.length} PDVs</b> selecionados ?
          </div>
        )}
      </Modal.Body>

      <Modal.Footer>
        <MwButton
          content='Cancelar'
          appearance='borderless'
          size='large'
          onClick={() => setModal(null)}
        />

        <MwButton
          content='Ativar'
          size='large'
          onClick={async () => {
            setLoading(true)
            setModal(null)

            const success = await toggleStatus(
              true,
              toUpdate.map((checked) => numberOrDefault(checked.id)),
            )

            if (success) toast(<ToasterContent color='normal' />, SuccessStyle)
            else toast(<ToasterContent color='error' />, ErrorStyle)

            reload()
          }}
        />
      </Modal.Footer>
    </Modal.Modal>
  )
}

export default Activate
