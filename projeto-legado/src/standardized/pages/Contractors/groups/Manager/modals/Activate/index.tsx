import { useState } from 'react'

import { MwButton } from '@mw-kit/mw-ui'
import toast from 'react-hot-toast'

import Modal from '../../../../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../../../components/Toaster'
import { BodyInterface } from '../../interfaces'
import { toggleStatus } from '../../services'

const Activate = (props: {
  checked: BodyInterface[]
  invalid: boolean
  reload: () => void
  close: () => void
}) => {
  const { checked, invalid, reload, close } = props

  const [loading, setLoading] = useState(false)

  const onSubmit = async () => {
    setLoading(true)

    const ids = checked.map((checked) => checked.id)

    try {
      await toggleStatus(1, ids)
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
        Ativar Agrupamento{checked.length > 1 && 's'}
      </Modal.Header>

      <Modal.Body>
        {invalid && <div>Apenas agrupamentos inativos podem ser ativados</div>}

        {checked.length > 1 ? (
          <div>
            Deseja ativar os{' '}
            <strong>
              {checked.filter((e) => e.active === 0).length} agrupamentos
              selecionados
            </strong>
            ?
          </div>
        ) : (
          <div>
            Deseja ativar o agrupamento <strong>{checked[0].name}</strong>?
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
