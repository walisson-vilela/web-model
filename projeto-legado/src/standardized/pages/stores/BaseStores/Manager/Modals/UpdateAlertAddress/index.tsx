import React, { useCallback, useState } from 'react'

import { MwButton, MwInput } from '@mw-kit/mw-ui'

import Modal from '../../../../../../../components/MwModal'

import * as S from './styled'

interface IUpdateAlertAddress {
  updated: number
  onClose: () => void
  setShowUpdated: React.Dispatch<React.SetStateAction<boolean>>
}

const UpdateAlertAddress = (props: IUpdateAlertAddress) => {
  const { updated, onClose, setShowUpdated } = props
  const [checked, setChecked] = useState(false)

  const onConfirm = useCallback(() => {
    setShowUpdated(!checked)
    onClose()
  }, [checked])

  return (
    <Modal.Modal
      open
      size='tiny'
      style={{
        width: '500px',
        maxWidth: '90vw',
        maxHeight: '90vh',
      }}
    >
      <Modal.Header color='white'>Notificação</Modal.Header>

      <Modal.Body>
        <div>
          {updated}{' '}
          {updated > 1
            ? 'PDVs tiveram seus endereços atualizados'
            : 'PDV teve seu endereço atualizado'}{' '}
          pela Receita Federal.
        </div>

        <div>
          Utilize o Filtro para identificar os Selo de Qualificação na cor Roxa
          e efetuar as correções.
        </div>
      </Modal.Body>

      <S.Footer>
        <MwInput
          type='checkbox'
          name='active'
          label='Não exibir novamente'
          onChange={(e) => setChecked(e.target.checked)}
          checked={checked}
        />

        <MwButton
          onClick={onConfirm}
          type='button'
          color='blue'
          children='OK'
        />
      </S.Footer>
    </Modal.Modal>
  )
}

export default UpdateAlertAddress
