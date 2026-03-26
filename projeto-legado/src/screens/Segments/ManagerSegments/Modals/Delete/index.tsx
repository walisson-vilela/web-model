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
import { deleteMultiple } from '../../services'

interface IDelete {
  segments: BodyInterface[]
  close: () => void
  reload: () => void
  hasInvalid: boolean
}

const Delete = (props: IDelete) => {
  const { segments, close, hasInvalid, reload } = props
  const [isLoading, setIsLoading] = useState(false)
  return (
    <Modal.Modal open size='tiny'>
      <Modal.Header>Deletar Canal</Modal.Header>
      <Modal.Body>
        {hasInvalid ? (
          <>
            <div>
              Não é permitido deletar os canais padrão e/ou que contenham
              vínculos de PDVs.
            </div>

            {segments.length > 1 ? (
              <div>
                Deseja deletar os outros <b>{segments.length} canais</b>{' '}
                selecionados?
              </div>
            ) : (
              <div>
                Você deseja Deletar o canal <b>{segments[0].name}</b>?
              </div>
            )}
          </>
        ) : segments.length !== 1 ? (
          <div>
            Deseja deletar os <b>{segments.length} canais</b> selecionados?
          </div>
        ) : (
          <div>
            Você deseja Deletar o canal <b>{segments[0].name}</b>?
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <MwButton
          content='Cancelar'
          type='button'
          appearance='borderless'
          onClick={close}
        />
        <MwButton
          content='Deletar'
          color='red'
          onClick={async () => {
            setIsLoading(true)
            try {
              await deleteMultiple(segments.map((segment) => segment.id))
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

export default Delete
