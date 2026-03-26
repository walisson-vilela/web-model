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

interface IActivate {
  toUpdate: BodyInterface[]
  close: () => void
  reload: () => void
  hasInvalid: boolean
}

const Active = (props: IActivate) => {
  const { toUpdate, close, reload, hasInvalid } = props

  const [loading, setLoading] = useState(false)

  const level = toUpdate[0].level
  // const multiLevel = toUpdate.some((data) => data.level !== level)

  return (
    <Modal.Modal open size='tiny'>
      <Modal.Header>
        {toUpdate.length > 1
          ? 'Ativar Categoria/Subnível'
          : 'Ativar Categorias/Subníveis'}
      </Modal.Header>

      <Modal.Body>
        {hasInvalid && (
          <div>
            Para ativar todas as Categorias e Subníveis é necessário definir
            antes todos os nível da hierarquia.
          </div>
        )}

        {toUpdate.length > 1 ? (
          <>
            <div>
              Deseja ativar as Categorias, subníveis e produtos elegíveis?
            </div>
          </>
        ) : level === 0 ? (
          <>
            <div>
              Deseja ativar a Categoria <b>{toUpdate[0].name}</b> selecionada?
            </div>

            <div>
              Esta ação ativa também toda a Hierarquia (Subníveis e Produtos).
            </div>
          </>
        ) : (
          <>
            <div>
              Deseja ativar o Subnível <b>{toUpdate[0].name}</b> selecionado?
            </div>

            <div>
              Esta ação ativa também toda a Hierarquia (Categoria, Subníveis e
              Produtos).
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
          content='Ativar'
          loading={loading}
          onClick={async () => {
            setLoading(true)

            try {
              await toggleStatus(
                true,
                toUpdate.map((checked) => checked.id),
              )

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

export default Active
