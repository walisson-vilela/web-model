import React, { useState } from 'react'

import { MwButton } from '@mw-kit/mw-ui'
import toast from 'react-hot-toast'

import Modal from '../../../../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../../../components/Toaster'
import { BodyInterface } from '../../interfaces'
import { toggleStatus } from '../../services'

const Inactivate = (props: {
  checked: BodyInterface[]
  invalid: boolean
  reload: () => void
  close: () => void
}) => {
  const { checked, invalid, reload, close } = props

  const [loading, setLoading] = useState(false)

  const onSubmit = async () => {
    setLoading(true)

    const updatedIds = checked.map((checked) => checked.id)

    try {
      await toggleStatus(0, updatedIds)
      toast(<ToasterContent color='normal' />, SuccessStyle)
    } catch (error) {
      console.error(error)
      setLoading(false)
      toast(<ToasterContent color='error' />, ErrorStyle)
      return
    }

    reload()
    close()
  }

  return (
    <Modal.Modal open size='tiny'>
      <Modal.Header>
        Inativar Agrupamento{checked.length > 1 && 's'}
      </Modal.Header>

      <Modal.Body>
        {invalid && <div>Apenas agrupamentos ativos podem ser inativados</div>}

        {checked.length > 1 ? (
          <React.Fragment>
            <div>
              Todas as tarefas e roteiros dos agrupamentos serão inativados.
            </div>
            <div>
              Deseja inativar os{' '}
              <strong>{checked.length} agrupamentos selecionados</strong>?
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div>
              Todas as tarefas e roteiros deste agrupamento serão inativados.
            </div>
            <div>
              Deseja inativar o agrupamento <strong>{checked[0].name}</strong>?
            </div>
          </React.Fragment>
        )}
      </Modal.Body>

      <Modal.Footer>
        <MwButton
          type='button'
          appearance='borderless'
          {...(loading ? { disabled: true } : { onClick: close })}
          children='Cancelar'
          size='large'
        />

        <MwButton
          type='button'
          color='warningRed'
          {...(loading ? { loading: true } : { onClick: onSubmit })}
          children='Inativar'
          size='large'
        />
      </Modal.Footer>
    </Modal.Modal>
  )
}

export default Inactivate
