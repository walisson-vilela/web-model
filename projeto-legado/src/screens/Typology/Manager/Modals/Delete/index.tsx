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

interface IInactive {
  checkeds: BodyInterface[]
  defaultTypology: boolean
  storesTypology: boolean
  reload: () => void
  close: () => void
}

const Delete = (props: IInactive) => {
  const { checkeds, defaultTypology, storesTypology, reload, close } = props

  const [loading, setLoading] = useState(false)

  const onSubmit = async () => {
    setLoading(true)

    try {
      const success = await deleteMultiple(
        checkeds.map((checked) => checked.id),
      )

      if (success) toast(<ToasterContent color='normal' />, SuccessStyle)
      reload()
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading(false)
    }

    reload()
    close()
  }

  return (
    <Modal.Modal open size='tiny'>
      <Modal.Header color='white'>
        Deletar tipologia{checkeds.length > 1 && 's'}
      </Modal.Header>

      <Modal.Body>
        {defaultTypology && (
          <div>Não é permitido deletar as tipologias default.</div>
        )}

        {checkeds.length === 1 ? (
          <>
            <div>
              Você deseja deletar a tipologia <b>{`(${checkeds[0].name})`}</b>?
            </div>
          </>
        ) : (
          <>
            {defaultTypology ? (
              <div>
                Você deseja Deletar as outras{' '}
                <b>{checkeds.length} tipologias</b> selecionadas?
              </div>
            ) : (
              <div>
                Você deseja Deletar as <b>{checkeds.length} tipologias</b>{' '}
                selecionadas?
              </div>
            )}
          </>
        )}

        {storesTypology && (
          <div>
            Uma vez realizada à ação, os{' '}
            <b>
              PDVs perderão os vínculos e a quebra não poderá ser revertida.
            </b>
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
          children='Deletar'
          size='large'
          color='warningRed'
        />
      </Modal.Footer>
    </Modal.Modal>
  )
}
export default Delete
