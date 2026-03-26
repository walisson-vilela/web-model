import { useCallback, useState } from 'react'

import { MwButton } from '@mw-kit/mw-ui'
import { GenericObject } from '@mw-kit/mw-ui/types'
import { isAxiosError } from 'axios'
import toast from 'react-hot-toast'

import Modal from '../../../../../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent
} from '../../../../../../../../components/Toaster'
import { ValidationError } from '../../../../../../../components/form/modals'
import { isObject } from '../../../../../../../utils/validators'
import useContext from '../../context'
import { saveSelected } from '../../service'

import * as Messages from './messages'

interface IConfirmModal {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

const ConfirmModal = (props: IConfirmModal) => {
  const { onClose, isOpen, onSuccess } = props

  const {
    left: [left, setLeft],
    right: [right, setRight],
    data,
    licenses: [, reloadLicenses],
  } = useContext()

  const [loading, setLoading] = useState(false)
  const [validationErrors, setValidationErrors] =
    useState<GenericObject | null>(null)

  const onConfirm = useCallback(async () => {
    if (left.length < 1 || !right) return

    setLoading(true)

    try {
      const response = await saveSelected(
        left.map((e) => e.id),
        right.id,
      )

      if (response.success === true) {
        toast(<ToasterContent color='normal' />, SuccessStyle)
        onClose()
        onSuccess()
        return
      } else {
        setValidationErrors(response.errors)
      }
    } catch (e) {
      if (
        isAxiosError(e) &&
        isObject(e.response) &&
        e.response.status === 404
      ) {
        setValidationErrors({ ids: 404 })
        return
      }

      console.error(e)
      toast(<ToasterContent color='error' />, ErrorStyle)
    }

    setLoading(false)
  }, [data.id, left, right])

  if (!right || left.length < 1) return null

  const messages = [Messages.FirstMessage, Messages.SecondMessage].reduce(
    (messages, Component) => {
      const children = Component({ data, right })
      return children ? [...messages, children] : messages
    },
    [] as JSX.Element[],
  )

  return (
    <Modal.Modal size='tiny' open={isOpen} centered={true}>
      <Modal.Header color='white' content='Transferir Usuário' />

      <Modal.Body>
        {messages.length > 0 && (
          <div
            children={
              messages.length === 1 ? messages : [messages[0], ' ', messages[1]]
            }
          />
        )}

        <div>
          <Messages.ThirdMessage data={data} right={right} left={left} />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <MwButton
          type='button'
          appearance='borderless'
          content='Cancelar'
          {...(loading ? { disabled: true } : { onClick: onClose })}
          size='large'
        />

        <MwButton
          loading={loading}
          type='button'
          content='Sim'
          size='large'
          onClick={onConfirm}
          color='red'
          disabled={right === null && left.length < 1}
        />
      </Modal.Footer>

      {validationErrors && (
        <ValidationError
          errors={validationErrors}
          onClose={() => setValidationErrors(null)}
          fields={{
            ids: {
              label: 'Usuários selecionados',
              handler: () => {
                setLeft([])
              },
            },
            role_id: {
              label: 'Função selecionada',
              handler: () => {
                setRight(null)
              },
            },
            licenses: {
              label: 'Cotas Disponíveis',
              handler: () => {
                setRight(null)
                reloadLicenses()
              },
            },
          }}
        />
      )}
    </Modal.Modal>
  )
}
export default ConfirmModal
