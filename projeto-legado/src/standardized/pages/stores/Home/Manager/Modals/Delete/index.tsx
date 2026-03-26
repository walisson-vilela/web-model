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

const Delete = () => {
  const { checkeds, reload, setLoading, setModal, deleteMultiple } =
    useModalPdv()

  const toUpdate = [...checkeds]
  return (
    <Modal.Modal open size='tiny'>
      <Modal.Header children='Deletar PDV' />

      <Modal.Body>
        {toUpdate.length === 1 ? (
          <React.Fragment>
            <div>
              Você deseja realmente deletar o PDV <b>({toUpdate[0].name})</b>?
            </div>

            <div>
              <b>
                Uma vez realizada à ação, os vínculos associados ao PDV serão
                apagados e não poderão mais ser revertidos.
              </b>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div>
              Você deseja realmente deletar os <b>{toUpdate.length} PDVs</b>{' '}
              selecionados?
            </div>

            <div>
              <b>
                Uma vez realizada à ação, os vínculos associados ao PDV serão
                apagados e não poderão mais ser revertidos.
              </b>
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
          content='Deletar'
          size='large'
          color='red'
          onClick={async () => {
            setLoading(true)
            setModal(null)

            const success = await deleteMultiple(
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
export default Delete
