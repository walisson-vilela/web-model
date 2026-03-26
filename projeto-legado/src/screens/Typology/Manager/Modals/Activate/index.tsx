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

interface IActive {
  unknownTypology: boolean
  checkeds: BodyInterface[]
  reload: () => void
  close: () => void
}

const Activate = (props: IActive) => {
  const { checkeds, reload, close, unknownTypology } = props

  const [loading, setLoading] = useState(false)

  const onSubmit = async () => {
    setLoading(true)

    try {
      await toggleStatus(
        1,
        checkeds.map((e) => e.id),
      )
      toast(<ToasterContent color='normal' />, SuccessStyle)
    } catch (error) {
      console.error(error)
      setLoading(false)
      toast(<ToasterContent color='error' />, ErrorStyle)
      return
    }

    reload()
    close()
  }

  return (
    <Modal.Modal open size='tiny'>
      <Modal.Header color='white'>
        Ativar Tipologia{checkeds.length > 1 && 's'}
      </Modal.Header>

      <Modal.Body>
        {unknownTypology && <div>Tipologia sem vinculo não possui status.</div>}

        {checkeds.length === 1 ? (
          <div>
            Você deseja Ativar a tipologia <b>{checkeds[0].name}</b>?
          </div>
        ) : (
          <div>
            Você deseja Ativar as outras <b>{checkeds.length} tipologias</b>{' '}
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
          children='Ativar'
          size='large'
        />
      </Modal.Footer>
    </Modal.Modal>
  )
}
export default Activate
