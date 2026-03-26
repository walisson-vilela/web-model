import { MwButton } from '@mw-kit/mw-ui'

import Modal from '../../../../../../../../../../../components/MwModal'
import useContext from '../../../../../../context'

interface ICNPJInUse {
  document: string
  name: string
}

const CNPJInUse = ({ document, name }: ICNPJInUse) => {
  const { setModal, form } = useContext()

  const { setValue, setValueOptions } = form

  return (
    <Modal.Modal open size='tiny'>
      <Modal.Header>Notificação</Modal.Header>
      <Modal.Body>
        <p style={{ marginBottom: '3.5px' }}>
          O CNPJ informado <b>{document}</b> já está sendo utilizado pela
          empresa {'"'}
          <b>{name}</b>
          {'"'}.
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
          Ok
        </MwButton>
      </Modal.Footer>
    </Modal.Modal>
  )
}
export default CNPJInUse
