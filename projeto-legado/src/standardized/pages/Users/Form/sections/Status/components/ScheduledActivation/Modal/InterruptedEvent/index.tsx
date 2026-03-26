import { useCallback } from 'react'

import { MwButton } from '@mw-kit/mw-ui'
import { SubmitErrorHandler, SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'

import Modal from '../../../../../../../../../../components/MwModal'
import {
  ErrorStyle,
  ToasterContent,
} from '../../../../../../../../../../components/Toaster'

import useInterruptEventContext, { InterruptEventProvider } from './context'
import * as Inputs from './inputs'
import { deleteUserEvent } from './service'
import * as S from './styled'
import { FormInterface, InterruptEventModalProps } from './types'

const Component = () => {
  const {
    form,
    loading: [loading, setLoading],
    close,
    reload,
    userId,
    eventId,
  } = useInterruptEventContext()

  const onSubmit: SubmitHandler<FormInterface> = useCallback(
    async (values) => {
      setLoading(true)
      try {
        await deleteUserEvent(userId, eventId, values)
        reload()
        close()
      } catch (e) {
        console.error(e)
        toast(<ToasterContent color='error' />, ErrorStyle)
        setLoading(false)
      }
    },
    [userId, eventId],
  )

  const onSubmitFail: SubmitErrorHandler<FormInterface> = (errors) => {
    console.error(errors)
  }

  return (
    <Modal.Modal open size='small'>
      <Modal.Header color='blue'>Interromper Ativação Programada</Modal.Header>

      <form onSubmit={form.handleSubmit(onSubmit, onSubmitFail)}>
        <Modal.Body>
          <S.SubTitle>
            Interrompendo a <b>Programação de Ativação</b>, qual ação deseja
            realizar?
          </S.SubTitle>

          <S.InputsSection>
            <Inputs.Activate label='Ativar Agora' value={true} />
            <Inputs.Activate
              label='Inativar Usuário (Apaga dados do Cadastro)'
              value={false}
            />

            <S.ClassificationContainer>
              <Inputs.Classification />

              <div>
                <Inputs.File />
              </div>
            </S.ClassificationContainer>
          </S.InputsSection>

          <S.NotificationContainer>
            <div>Notificação</div>
            <div>
              Ao inativar o usuário, todos os dados complementares do cadastro
              serão deletados. Será necessário preenche-los novamente, caso
              deseje reativar o usuário.
            </div>
          </S.NotificationContainer>
        </Modal.Body>

        <S.Footer>
          <MwButton appearance='borderless' onClick={close} disabled={loading}>
            Cancelar
          </MwButton>

          <MwButton type='submit' loading={loading}>
            Salvar
          </MwButton>
        </S.Footer>
      </form>
    </Modal.Modal>
  )
}

const InterruptedEventModal = (props: InterruptEventModalProps) => {
  return <InterruptEventProvider {...props} children={<Component />} />
}

export default InterruptedEventModal
