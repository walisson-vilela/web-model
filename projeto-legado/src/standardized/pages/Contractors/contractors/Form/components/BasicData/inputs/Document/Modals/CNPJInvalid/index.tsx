import { MwButton } from '@mw-kit/mw-ui'

import Modal from '../../../../../../../../../../../components/MwModal'
import useContext from '../../../../../../context'

interface ICNPJInvalid {
  document: string
}

const CNPJInvalid = ({ document }: ICNPJInvalid) => {
  const { setModal, form } = useContext()

  const { setValue, setValueOptions } = form

  return (
    <Modal.Modal open size='tiny'>
      <Modal.Header>Notificação</Modal.Header>
      <Modal.Body>
        <p style={{ marginBottom: '3.5px' }}>
          O CNPJ {document} é invalido, informe um CNPJ correto.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <MwButton
          type='button'
          onClick={() => {
            setModal(null)
            setValue('document', '', setValueOptions)
          }}
        >
          Entendi
        </MwButton>
      </Modal.Footer>
    </Modal.Modal>
  )
}
export default CNPJInvalid
