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
import { toggleStatus } from '../../services'

const Inactivate = (props: {
  checkeds: BodyInterface[]
  reload: () => void
  close: () => void
  invalidInative: boolean
}) => {
  const { checkeds, reload, close, invalidInative } = props

  const [loading, setLoading] = useState(false)

  const onSubmit = async () => {
    setLoading(true)

    try {
      await toggleStatus(
        0,
        checkeds.map((e) => numberOrDefault(e.id)),
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
        Inativar Conta{checkeds.length > 1 && 's'}
      </Modal.Header>

      <Modal.Body>
        {invalidInative && (
          <div>
            Apenas <b>Subcontas</b> Ativas podem ser Inativadas.
          </div>
        )}

        <div>Todas as tarefas e roteiros das contas serão inativados.</div>

        {checkeds.length > 1 ? (
          <div>
            Deseja inativar{' '}
            <strong>{checkeds.length} contas selecionadas?</strong>
          </div>
        ) : (
          <div>
            Deseja inativar a conta{' '}
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
          children='Inativar'
          size='large'
        />
      </Modal.Footer>
    </Modal.Modal>
  )
}

export default Inactivate
