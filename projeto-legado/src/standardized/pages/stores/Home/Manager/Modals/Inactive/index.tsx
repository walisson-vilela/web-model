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

const Inactivate = () => {
  const { checkeds, reload, setLoading, setModal, toggleStatus } = useModalPdv()
  const toUpdate = checkeds.filter((checked) => checked.status)

  return (
    <Modal.Modal open size='tiny'>
      <Modal.Header children='Inativar PDV' />

      <Modal.Body>
        {toUpdate.length === 1 ? (
          <React.Fragment>
            <div>Você deseja realmente inativar o PDV abaixo:</div>

            <div>
              <b>({toUpdate[0].name})</b>? Uma vez realizado à ação os
              atendimentos e as tarefas relacionadas ao PDV estarão suspensos.
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div>
              Você deseja realmente inativar os <b>{toUpdate.length} PDVs</b>{' '}
              selecionados?
            </div>

            <div>
              Uma vez realizado à ação os atendimentos e as tarefas relacionadas
              ao PDV estarão suspensos.
            </div>
          </React.Fragment>
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
          content='Inativar'
          color='red'
          size='large'
          onClick={async () => {
            setLoading(true)
            setModal(null)

            const success = await toggleStatus(
              false,
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

export default Inactivate
