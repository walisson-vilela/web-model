import { useState } from 'react'

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

const Activate = (props: {
  checkeds: BodyInterface[]
  reload: () => void
  close: () => void
  invalidAtive: boolean
}) => {
  const { checkeds, reload, close, invalidAtive } = props

  const [loading, setLoading] = useState(false)

  const onSubmit = async () => {
    setLoading(true)

    try {
      await toggleStatus(
        1,
        checkeds.map((e) => e.id),
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
        Ativar Conta{checkeds.length > 1 && 's'}
      </Modal.Header>

      <Modal.Body>
        {invalidAtive && (
          <div>
            Apenas <b>Subcontas</b> Inativas podem ser Ativadas.
          </div>
        )}

        {checkeds.length > 1 ? (
          <div>
            Deseja ativar{' '}
            <strong>
              {checkeds.filter((e) => e.active === 0).length} contas
              selecionadas?
            </strong>
          </div>
        ) : (
          <div>
            Deseja ativar a conta{' '}
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
          {...(loading ? { loading: true } : { onClick: onSubmit })}
          children='Ativar'
          size='large'
        />
      </Modal.Footer>
    </Modal.Modal>
  )
}

export default Activate
