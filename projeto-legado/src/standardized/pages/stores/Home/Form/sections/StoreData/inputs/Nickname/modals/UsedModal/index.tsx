import Modal from '../../../../../../../../../../../components/MwModal'

const UsedModal = (props: { nickname: string; onConfirm: () => void }) => {
  const { nickname, onConfirm } = props

  return (
    <Modal.Modal open size='tiny'>
      <Modal.Header children='Notificação' />

      <Modal.Body>
        <div>
          O nome de identificação informado <b>{nickname}</b> já está sendo
          utilizado (<b>{nickname}</b>)
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
