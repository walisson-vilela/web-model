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
import { toggleStatusWorkshift } from '../../service'

const Inactivate = (props: {
  checked: BodyInterface[]

  reload: () => void
  close: () => void
}) => {
  const { checked, reload, close } = props

  const [loading, setLoading] = useState(false)

  const onSubmit = async () => {
    setLoading(true)

    const ids = checked.map((checked) => checked.id)

    try {
      await toggleStatusWorkshift(ids, false)
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

  const filtered = checked.filter((e) => e.active === true)

  return (
    <Modal.Modal open size='tiny'>
      <Modal.Header>
        Inativar Agrupamento{filtered.length > 1 && 's'}
      </Modal.Header>

      <Modal.Body>
        <div>
          Ao inativar, o turno não estará disponível para atribuir futuros
          usuários.
        </div>

        {filtered.length > 1 ? (
          <div>
            Deseja inativar os{' '}
            <strong>{filtered.length} turnos ativos selecionados</strong>?
          </div>
        ) : (
          <React.Fragment>
            <div>
              Deseja inativar o turno{' '}
              <strong>{filtered[0].electronic_point_label}</strong>?
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
