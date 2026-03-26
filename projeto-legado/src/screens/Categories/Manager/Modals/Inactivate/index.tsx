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
}

const Inactivate = (props: IActivate) => {
  const { toUpdate, close, reload } = props

  const [loading, setLoading] = useState(false)

  const level = toUpdate[0].level
  const multiLevel = toUpdate.some((data) => data.level !== level)

  return (
    <Modal.Modal open size='tiny'>
      <Modal.Header>
        {toUpdate.length > 1
          ? 'Inativar Categoria/Subnível'
          : 'Inativar Categorias/Subníveis'}
      </Modal.Header>

      <Modal.Body>
        {toUpdate.length > 1 ? (
          <>
            <div>
              Esta ação Inativa toda a hierarquia, Categoria, subníveis e seus
              produtos.
            </div>
            <div>
              Você deseja inativar as Categorias e seus Subníveis selecionados?
            </div>
          </>
        ) : level === 0 ? (
          <>
            <div>
              Deseja inativar a Categoria <b>{toUpdate[0].name}</b>?
            </div>

            <div>Esta ação inativa também todos os subníveis e produtos.</div>
          </>
        ) : level === 1 ? (
          <>
            <div>
              Você deseja inativar Subnível <b>{toUpdate[0].name}</b>?
            </div>

            <div>
              Esta ação inativa também todos os subníveis e produtos abaixo e
              sendo o único, irá inativar junto a Categoria.
            </div>
          </>
        ) : (
          <>
            <div>
              Você deseja inativar Subnível <b>{toUpdate[0].name}</b>?
            </div>

            <div>
              Sendo o subnível o único desse nível na Categoria, a ação irá
              inativar toda hierarquia (Categoria, subnível e Produto).
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
          color='warningRed'
          content='Inativar'
          loading={loading}
          onClick={async () => {
            setLoading(true)

            try {
              await toggleStatus(
                false,
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

export default Inactivate
