import { useState } from 'react'

import { MwButton } from '@mw-kit/mw-ui'
import toast from 'react-hot-toast'

import Modal from '../../../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../../components/Toaster'
import { BodyInterface } from '../../interface'
import { deleteMultiple } from '../../service'

const Delete = (props: {
  checked: BodyInterface[]
  reload: () => void
  isInvalid: boolean
  close: () => void
}) => {
  const { checked, isInvalid, reload, close } = props

  const [loading, setLoading] = useState(false)

  const onSubmit = async () => {
    setLoading(true)

    const ids = checked.map((checked) => checked.id)

    try {
      await deleteMultiple(ids)
      toast(<ToasterContent color='normal' />, SuccessStyle)
      reload()
      close()
    } catch (error) {
      console.error(error)
      setLoading(false)
      toast(<ToasterContent color='error' />, ErrorStyle)
    }
  }

  return (
    <Modal.Modal open size='tiny'>
      <Modal.Header color='white'>
        Deletar Agrupamento{checked.length > 1 && 's'}
      </Modal.Header>

      <Modal.Body>
        {isInvalid && (
          <div>Não é possível deletar turnos com usuários associados.</div>
        )}
        <div>Esta Ação removerá definitivamente os turnos deletados.</div>
        {checked.length > 1 ? (
          <div>
            Deseja deletar os{' '}
            <strong>{checked.length} turnos elegíveis selecionados</strong>?
          </div>
        ) : (
          <div>
            Deseja deletar o turno elegível &nbsp;
            <strong>{checked[0].electronic_point_label}</strong> selecionado?
          </div>
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
          children='Deletar'
          size='large'
        />
      </Modal.Footer>
    </Modal.Modal>
  )
}

export default Delete
