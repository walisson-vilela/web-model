import { useState } from 'react'

import { MwButton } from '@mw-kit/mw-ui'
import toast from 'react-hot-toast'

import Modal from '../../../../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../../../components/Toaster'
import { useTabsContext } from '../../../../../../../routes'
import { BodyInterface } from '../../interfaces'
import { deleteMultiple } from '../../services'

const Delete = (props: {
  checked: BodyInterface[]
  reload: () => void
  close: () => void
}) => {
  const { checked, reload, close } = props

  const { close: closeTab } = useTabsContext()

  const [loading, setLoading] = useState(false)

  const onSubmit = async () => {
    setLoading(true)

    const updatedIds = checked.map((checked) => checked.id)

    try {
      await deleteMultiple(updatedIds, closeTab)
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
        Deletar Agrupamento{checked.length > 1 && 's'}
      </Modal.Header>

      <Modal.Body>
        <div>Todas os dados serão deletados e usuários perderão vinculos.</div>

        {checked.length > 1 ? (
          <div>
            Deseja deletar os{' '}
            <strong>{checked.length} agrupamentos selecionados</strong>?
          </div>
        ) : (
          <div>
            Deseja deletar o agrupamento <strong>{checked[0].name}</strong>?
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
          color='warningRed'
          {...(loading ? { loading: true } : { onClick: onSubmit })}
          children='Deletar'
          size='large'
        />
      </Modal.Footer>
    </Modal.Modal>
  )
}

export default Delete
