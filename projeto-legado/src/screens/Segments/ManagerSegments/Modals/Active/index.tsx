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
  segments: BodyInterface[]
  close: () => void
  reload: () => void
}

const Active = (props: IActive) => {
  const {
    segments,
    close,

    reload,
  } = props

  const [isLoading, setIsLoading] = useState(false)
  return (
    <Modal.Modal open size='tiny'>
      <Modal.Header>Ativar Canal</Modal.Header>
      <Modal.Body>
        <div>
          {segments.length === 1 ? (
            <div>
              Você deseja Ativar o canal <b>{segments[0].name}</b>?
            </div>
          ) : (
            <div>
              Você deseja Ativar os <b>{segments.length} canais</b>{' '}
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
          content='Ativar'
          color='blue'
          onClick={async () => {
            setIsLoading(true)
            try {
              await toggleStatus(
                true,
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

export default Active
