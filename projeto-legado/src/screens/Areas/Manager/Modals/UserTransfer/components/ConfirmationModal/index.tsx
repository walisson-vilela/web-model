import { useCallback, useState } from 'react'

import { MwButton, MwInput } from '@mw-kit/mw-ui'
import toast from 'react-hot-toast'

import Modal from '../../../../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../../../components/Toaster'
import useContext from '../../context'
import { saveSelected } from '../../service'

import * as S from './styles'

interface IConfirmModal {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

const ConfirmModal = (props: IConfirmModal) => {
  const { onClose, isOpen, onSuccess } = props

  const {
    left: [left],
    right: [right],
    data,
    hierarchy,
  } = useContext()

  const [loading, setLoading] = useState(false)
  const [checked, setChecked] = useState(false)

  const onConfirm = useCallback(async () => {
    if (left.length < 1 || !right) return

    setLoading(true)
    try {
      await saveSelected(
        data.id,
        left.map((e) => e.id),
        right.id,
        hierarchy.id,
      )

      toast(<ToasterContent color='normal' />, SuccessStyle)

      onSuccess()
    } catch (e) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    }

    setLoading(false)
  }, [data.id, hierarchy.id, left, right])

  if (!right || left.length < 1) return null

  return (
    <Modal.Modal size='tiny' open={isOpen} centered={true}>
      <Modal.Header color='white' content='Notificação' />

      <Modal.Body>
        <div>
          Ao transferir o usuário de uma área em que ele tenha elo com roteiro,
          o vinculo será quebrado. Deseja transferir{' '}
          {left.length > 1
            ? `${left.length} usuários`
            : `${left.length} usuário`}
          ?
        </div>
      </Modal.Body>

      <Modal.Footer>
        <S.CheckContainer>
          <MwInput
            type='checkbox'
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            label='Estou ciente do impacto'
          />
        </S.CheckContainer>

        <MwButton
          type='button'
          appearance='borderless'
          content='Cancelar'
          {...(loading ? { disabled: true } : { onClick: onClose })}
          size='large'
        />

        <MwButton
          loading={loading}
          type='button'
          content='Sim'
          size='large'
          {...(checked ? { onClick: onConfirm } : { disabled: true })}
        />
      </Modal.Footer>
    </Modal.Modal>
  )
}
export default ConfirmModal
