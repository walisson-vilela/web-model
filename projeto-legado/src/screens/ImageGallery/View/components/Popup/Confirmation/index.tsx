import React, { useState } from 'react'

import { MwButton } from '@mw-kit/mw-ui'

import { ConfirmationProps } from './interfaces'
import * as S from './styles'

const PopUpConfirmation = (props: ConfirmationProps) => {
  const { status, id, closePopUp, handleRemoveConfirmation } = props
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleConfirmationFunc = async () => {
    setIsLoading(true)
    const response = await handleRemoveConfirmation(id)

    if (!response) {
      setIsLoading(false)
    }
  }

  return (
    <S.Container>
      <S.Header>
        <div>
          <strong> Status: {status === 'A' ? 'Aprovado' : 'Reprovado'}</strong>
          <p>
            {' '}
            Você está prestes a remover o status de{' '}
            {status === 'A' ? 'aprovação' : 'reprovação'} desta imagem.
          </p>
          <p>Você deseja confirmar essa ação?</p>
        </div>
      </S.Header>
      <S.Footer>
        <MwButton
          appearance='borderless'
          content={'Cancelar'}
          onClick={() => closePopUp()}
        />
        <MwButton
          appearance='solid'
          color='red'
          loading={isLoading}
          content={'Confirmo'}
          onClick={() => handleConfirmationFunc()}
          style={{ width: '105px' }}
        />
      </S.Footer>
    </S.Container>
  )
}

export default PopUpConfirmation
