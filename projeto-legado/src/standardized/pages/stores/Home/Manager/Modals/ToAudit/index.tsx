import { MwButton } from '@mw-kit/mw-ui'
import toast from 'react-hot-toast'

import Modal from '../../../../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../../../components/Toaster'
import { numberOrDefault } from '../../../../../../../utils/Formatters'
import { useModalPdv } from '../provider'

const ToAudit = () => {
  const { checkeds, reload, setLoading, setModal, submitToAudit } =
    useModalPdv()
  return (
    <Modal.Modal open size='tiny'>
      <Modal.Header children='Submeter Auditoria de Campo' />

      <Modal.Body>
        {checkeds.length === 1 ? (
          <div>
            Foi selecionado o PDV <b>{checkeds[0].name}</b>
          </div>
        ) : (
          <div>
            Foram selecionados <b>{checkeds.length} PDVs</b>.
          </div>
        )}

        <div>Você confirma o envio da auditoria?</div>
      </Modal.Body>

      <Modal.Footer>
        <MwButton
          content='Cancelar'
          appearance='borderless'
          size='large'
          onClick={() => setModal(null)}
        />

        <MwButton
          content='Confirmar'
          size='large'
          onClick={async () => {
            setLoading(true)
            setModal(null)

            const success = await submitToAudit(
              null,
              checkeds.map((checked) => numberOrDefault(checked.id)),
            )

            if (success) toast(<ToasterContent color='normal' />, SuccessStyle)
            else toast(<ToasterContent color='error' />, ErrorStyle)

            reload()
          }}
        />
      </Modal.Footer>
    </Modal.Modal>
  )
}
export default ToAudit
