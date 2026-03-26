import Modal from '../../../../../../../../../../../components/MwModal'
import { CheckAddress } from '../../../../../../../components'
import { ResponseBaseStore } from '../../../../../../services/checkNickname'
import { CheckAddressContainer } from '../styles'

const InvalidSourceModal = (props: {
  response: ResponseBaseStore['data']
  onConfirm: () => void
}) => {
  const { response, onConfirm } = props

  return (
    <Modal.Modal open size='tiny'>
      <Modal.Header children='Notificação' />

      <Modal.Body>
        <div>
          Identificamos um PDV com o nome de identificação{' '}
          <b>{response.nickname}</b> com dados incompatíveis. Verifique o nome
          de identificação ou contate o Administrador.
        </div>

        <CheckAddressContainer>
          <CheckAddress status={response.source_status} right>
            <b>{response.nickname}</b>
          </CheckAddress>
        </CheckAddressContainer>

        <div>{response.address}</div>
      </Modal.Body>

      <Modal.Footer
        buttonType='MwButton'
        actions={[
          {
            type: 'button',
            onClick: onConfirm,
            children: 'OK',
          },
        ]}
      />
    </Modal.Modal>
  )
}

export default InvalidSourceModal
