import { MwButton } from '@mw-kit/mw-ui'

import Modal from '../../../../../../../components/MwModal'
import { Form } from '../../interfaces'

import * as S from './styled'

interface INotificateInvalidAddress {
  mode: 'save' | 'alert'
  data: Form['source_address']
  close: () => void
}

const NotificateInvalidAddress = (props: INotificateInvalidAddress) => {
  const { data, close, mode } = props

  const texts =
    mode === 'alert'
      ? [
          'Verifique se inseriu o CNPJ correto ou contate o administrador da conta.',
          'Endereço do CNPJ:',
        ]
      : [
          'Não é possível salvar PDVs com incompatibilidade de Endereço.',
          'Endereço Incompatível:',
        ]

  return (
    <Modal.Modal
      style={{
        width: '500px',
        maxHeight: '90vh',
        maxWidth: '90vw',
      }}
      open
      size='tiny'
    >
      <Modal.Header color='white' children='Notificação' />

      <Modal.Body $paddingTop='s3' $paddingBottom='s3' $gap='s3'>
        <S.Content>
          <div>
            O endereço do CNPJ inserido é incompativel com o endereço do
            cadastro.
          </div>

          <div>{texts[0]}</div>
        </S.Content>

        <S.Content>
          <div>
            <b>{texts[1]}</b>
          </div>

          <div>{data ? data.formatted : '-'}</div>
        </S.Content>
      </Modal.Body>

      <Modal.Footer>
        <MwButton type='button' onClick={close} children='OK' />
      </Modal.Footer>
    </Modal.Modal>
  )
}

export default NotificateInvalidAddress
