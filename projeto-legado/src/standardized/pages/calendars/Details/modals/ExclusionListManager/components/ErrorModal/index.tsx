import Modal, {
  type ModalState,
} from '../../../../../../../../components/MwModal'

export const ErrorModal = ({ modal }: { modal: ModalState | null }) => {
  return <Modal {...{ modal }} />
}
