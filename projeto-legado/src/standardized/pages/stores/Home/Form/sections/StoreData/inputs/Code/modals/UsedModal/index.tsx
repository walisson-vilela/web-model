import Modal from '../../../../../../../../../../../components/MwModal'

const UsedModal = (props: {
  code: string
  nickname: string
  onConfirm: () => void
}) => {
  const { code, nickname, onConfirm } = props

  return (
    <Modal.Modal open size='tiny'>
      <Modal.Header children='Notificação' />

      <Modal.Body>
        <div>
          O código informado <b>{code}</b> já está sendo utilizado (
          <b>{nickname}</b>)
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

export default UsedModal
