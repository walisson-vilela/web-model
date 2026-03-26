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
  segments: BodyInterface[]
  close: () => void
  reload: () => void
}

const Inactive = (props: IInactive) => {
  const {
    segments,
    close,

    reload,
  } = props
  const [isLoading, setIsLoading] = useState(false)

  return (
    <Modal.Modal open size='tiny'>
      <Modal.Header>Inativar Canal</Modal.Header>
      <Modal.Body>
        <div>
          {segments.length === 1 ? (
            <div>
              Você deseja Inativar o Canal <b>{segments[0].name}</b>?
            </div>
          ) : (
            <div>
              Você deseja Inativar os <b>{segments.length} Canais</b>{' '}
              selecionados?
            </div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <MwButton
          content='Cancelar'
          type='button'
          appearance='borderless'
          onClick={close}
        />
        <MwButton
          content='Inativar'
          color='red'
          onClick={async () => {
            setIsLoading(true)
            try {
              await toggleStatus(
                false,
                segments.map((checked) => checked.id),
              )

              close()
              reload()

              toast(<ToasterContent color='normal' />, SuccessStyle)
            } catch (error) {
              console.error(error)
              toast(<ToasterContent color='error' />, ErrorStyle)
              setIsLoading(false)
            }
          }}
          loading={isLoading}
        />
      </Modal.Footer>
    </Modal.Modal>
  )
}

export default Inactive
