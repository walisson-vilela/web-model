import { useState } from 'react'

import { MwButton } from '@mw-kit/mw-ui'
import toast from 'react-hot-toast'

import Modal from '../../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../components/Toaster'
import { BodyInterface } from '../../interfaces'
import { toggleStatus } from '../../services'

interface IInactive {
  checkeds: BodyInterface[]
  unknownTypology: boolean
  reload: () => void
  close: () => void
}

const Inativate = (props: IInactive) => {
  const { checkeds, reload, close, unknownTypology } = props

  const [loading, setLoading] = useState(false)

  const onSubmit = async () => {
    setLoading(true)

    try {
      const success = await toggleStatus(
        0,
        checkeds.map((checked) => checked.id),
      )

      if (success) toast(<ToasterContent color='normal' />, SuccessStyle)

      reload()
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    }

    reload()
    close()
  }

  return (
    <Modal.Modal open size='tiny'>
      <Modal.Header color='white'>
        Inativar Tipologia{checkeds.length > 1 && 's'}
      </Modal.Header>

      <Modal.Body>
        {unknownTypology && <div>Tipologia sem vinculo não possui status.</div>}

        {checkeds.length === 1 ? (
          <div>
            Você deseja Inativar a tipologia <b>{checkeds[0].name}</b>?
          </div>
        ) : unknownTypology ? (
          <div>
            Você deseja Inativar as outras <b>{checkeds.length} tipologias</b>{' '}
            selecionadas?
          </div>
        ) : (
          <div>
            Você deseja Inativar as <b>{checkeds.length} tipologias</b>{' '}
            selecionadas?
          </div>
        )}
      </Modal.Body>

      <Modal.Footer>
        <MwButton
          type='button'
          appearance='borderless'
          {...(loading ? { disabled: true } : { onClick: close })}
          children='Cancelar'
          size='large'
        />

        <MwButton
          type='button'
          {...(loading ? { loading: true } : { onClick: onSubmit })}
          children='Inativar'
          size='large'
          color='warningRed'
        />
      </Modal.Footer>
    </Modal.Modal>
  )
}
export default Inativate
