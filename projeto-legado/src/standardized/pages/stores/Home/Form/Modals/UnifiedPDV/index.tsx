import { useState } from 'react'

import { MwButton } from '@mw-kit/mw-ui'
import toast from 'react-hot-toast'

import Modal from '../../../../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../../../components/Toaster'
import { deleteUnifiedPDV } from '../../services'

interface IUnifiedPDVProps {
  close: () => void
  id: number
}

const UnifiedPDVModal = (props: IUnifiedPDVProps) => {
  const { close, id } = props
  const [loading, setLoading] = useState(false)

  const onSubmit = async () => {
    setLoading(true)

    try {
      await deleteUnifiedPDV(id)

      toast(<ToasterContent color='normal' />, SuccessStyle)
    } catch (error) {
      console.error(error)

      toast(<ToasterContent color='error' />, ErrorStyle)
    }

    close()
  }

  return (
    <Modal.Modal open size='tiny'>
      <Modal.Header color='white'>PDV Unificado</Modal.Header>

      <Modal.Body>
        <div>
          Este PDV foi Unificado. Por haver duplicidade deste PDV nesta conta os
          campos Dados do PDV foram alterados e Contatos foram resetados.
        </div>

        <div>Verifique a necessidade de rever estes dados.</div>
      </Modal.Body>

      <Modal.Footer>
        <MwButton
          type='button'
          {...(loading ? { loading: true } : { onClick: onSubmit })}
          children='OK'
          size='large'
        />
      </Modal.Footer>
    </Modal.Modal>
  )
}

export default UnifiedPDVModal
