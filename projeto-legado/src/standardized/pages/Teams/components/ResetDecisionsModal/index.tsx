import { useCallback, useState } from 'react'

import { MwButton, MwInput } from '@mw-kit/mw-ui'
import { toast } from 'react-hot-toast'

import Modal from '../../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../components/Toaster'

import { ConfirmationModalP, ConfirmationModalTitle } from './styles'

export const ResetDecisionsModal = ({
  close,
  reload,
  onSubmit,
}: {
  close: () => void
  reload: () => void
  onSubmit: (confirmResetDecisions: boolean) => Promise<void>
}) => {
  const [loading, setLoading] = useState(false)
  const [checked, setChecked] = useState(false)

  const onReset = useCallback(async () => {
    setLoading(true)

    try {
      await onSubmit(!checked)
      toast(<ToasterContent color='normal' />, SuccessStyle)
      reload()
      close()
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
      console.error(error)
      setLoading(false)
    }
  }, [checked, onSubmit, reload])

  return (
    <Modal.Modal size='tiny' open={true}>
      <Modal.Header>
        <ConfirmationModalTitle>
          Resetar Decisões Manuais
        </ConfirmationModalTitle>
      </Modal.Header>

      <Modal.Body>
        <ConfirmationModalP>
          Ao Resetar as Decisões Manuais, o sistema tentará reorganizar o time
          automaticamente e todo conflito que ocorra deverá ser ajustado
          manualmente. Deseja Resetar?
        </ConfirmationModalP>
      </Modal.Body>

      <Modal.Footer
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <MwInput
          type='checkbox'
          label='Não repetir esta mensagem'
          onChange={(e) => setChecked(e.target.checked)}
          checked={checked}
        />

        <div>
          <MwButton
            content='Cancelar'
            size='small'
            onClick={close}
            appearance='borderless'
          />

          <MwButton
            content='Resetar'
            size='small'
            color='blue'
            onClick={onReset}
            loading={loading}
          />
        </div>
      </Modal.Footer>
    </Modal.Modal>
  )
}
