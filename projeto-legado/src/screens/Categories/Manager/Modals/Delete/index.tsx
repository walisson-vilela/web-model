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
  toUpdate: BodyInterface[]
  close: () => void
  reload: () => void
  hasInvalid: boolean
}

const Delete = (props: IDelete) => {
  const { toUpdate, close, reload, hasInvalid } = props

  const [loading, setLoading] = useState(false)

  const level = toUpdate[0].level
  // const multiLevel = toUpdate.some((data) => data.level !== level)

  return (
    <Modal.Modal open size='tiny'>
      <Modal.Header>
        {toUpdate.length > 1
          ? 'Deletar Categoria/Subnível'
          : 'Deletar Categorias/Subníveis'}
      </Modal.Header>

      <Modal.Body>
        {hasInvalid && (
          <div>
            Não é permitido deletar as Categorias/Subníveis com produtos
            associados.
          </div>
        )}

        {toUpdate.length > 1 ? (
          <div>
            Deseja deletar <b>{toUpdate.length}</b> Seleções elegíveis?
          </div>
        ) : level === 0 ? (
          <>
            <div>
              Você deseja realmente deletar Categoria <b>{toUpdate[0].name}</b>?
            </div>

            <div>A ação também deleta os Subníveis abaixo na hierarquia.</div>
          </>
        ) : level === 1 ? (
          <>
            <div>
              Você deseja realmente deletar subnível <b>{toUpdate[0].name}</b>?
            </div>

            <div>
              Esta ação deleta também todos os Subníveis abaixo e sendo o único
              ativo, irá inativar junto a Categoria.
            </div>
          </>
        ) : (
          <>
            <div>
              Você deseja realmente deletar subnível <b>{toUpdate[0].name}</b>?
            </div>

            <div>
              Sendo o único ativo neste nível, a ação irá inativar toda a
              hierarquia Categoria e Subnível.
            </div>
          </>
        )}
      </Modal.Body>

      <Modal.Footer>
        <MwButton
          type='button'
          appearance='borderless'
          content='Cancel'
          onClick={close}
        />

        <MwButton
          type='button'
          content='Deletar'
          color='warningRed'
          loading={loading}
          onClick={async () => {
            setLoading(true)

            try {
              await deleteMultiple(toUpdate.map((checked) => checked.id))

              reload()
              toast(<ToasterContent color='normal' />, SuccessStyle)
              close()
            } catch (error) {
              console.error(error)
              toast(<ToasterContent color='error' />, ErrorStyle)
              setLoading(false)
            }
          }}
        />
      </Modal.Footer>
    </Modal.Modal>
  )
}

export default Delete
