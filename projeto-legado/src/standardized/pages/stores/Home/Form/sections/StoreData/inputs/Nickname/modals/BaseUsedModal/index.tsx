import Modal from '../../../../../../../../../../../components/MwModal'

const BaseUsedModal = (props: {
  typedNickname: string
  usedNickname: string
  onConfirm: () => void
}) => {
  const { typedNickname, usedNickname, onConfirm } = props

  return (
    <Modal.Modal open size='tiny'>
      <Modal.Header children='Notificação' />

      <Modal.Body>
        <div>
          Não é possível cadastrar o PDV <b>{typedNickname}</b> pois o mesmo já
          esta vinculado em sua base com o nome de <b>{usedNickname}</b>
        </div>
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

export default BaseUsedModal
