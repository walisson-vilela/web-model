import { useState } from 'react'

import { MwButton } from '@mw-kit/mw-ui'
import toast from 'react-hot-toast'

import Modal from '../../../../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../../../components/Toaster'
import { numberOrDefault } from '../../../../../../../utils/Formatters'
import { BodyInterface } from '../../interfaces'
import { deleteStores } from '../../service'

const Delete = (props: {
  checkeds: BodyInterface[]
  reload: () => void
  close: () => void
  invalidDelete: boolean
}) => {
  const { checkeds, reload, close, invalidDelete } = props

  const [loading, setLoading] = useState(false)

  const onSubmit = async () => {
    setLoading(true)

    try {
      await deleteStores(checkeds.map((e) => numberOrDefault(e.id)))
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
      <Modal.Header color='white'>
        Deletar PDV{checkeds.length > 1 && 's'}
      </Modal.Header>

      <Modal.Body>
        {invalidDelete && (
          <div>PDVs com contas associadas não podem ser deletados.</div>
        )}

        {checkeds.length > 1 ? (
          <div>Deseja deletar {checkeds.length} PDVs selecionados?</div>
        ) : (
          <div>
            Você deseja realmente deletar o PDV <b>{checkeds[0].nickname}</b>?
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
