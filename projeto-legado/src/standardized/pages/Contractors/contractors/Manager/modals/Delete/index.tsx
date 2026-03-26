import { useState } from 'react'

import { MwButton } from '@mw-kit/mw-ui'
import toast from 'react-hot-toast'

import Modal from '../../../../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../../../components/Toaster'
import { useTabsContext } from '../../../../../../../routes'
import { numberOrDefault } from '../../../../../../../utils/Formatters'
import { BodyInterface } from '../../interfaces'
import { deleteMultiple } from '../../services'

const Delete = (props: {
  checkeds: BodyInterface[]
  reload: () => void
  close: () => void
  invalidDelete: boolean
}) => {
  const { checkeds, reload, close, invalidDelete } = props

  const { close: closeTab } = useTabsContext()

  const [loading, setLoading] = useState(false)

  const onSubmit = async () => {
    setLoading(true)

    try {
      await deleteMultiple(
        checkeds.map((e) => numberOrDefault(e.id)),
        closeTab,
      )
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
        Deletar Conta{checkeds.length > 1 && 's'}
      </Modal.Header>

      <Modal.Body>
        {invalidDelete && (
          <div>
            Apenas <b>Subcontas</b> podem ser Deletadas.
          </div>
        )}
        <div>
          Todos os dados serão deletados e usuários serão inativados
          definitivamente.
        </div>

        {checkeds.length > 1 ? (
          <div>
            Deseja deletar{' '}
            <strong>{checkeds.length} contas selecionadas?</strong>
          </div>
        ) : (
          <div>
            Deseja deletar a conta{' '}
            <strong>{checkeds[0].casual_name} selecionada?</strong>
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
