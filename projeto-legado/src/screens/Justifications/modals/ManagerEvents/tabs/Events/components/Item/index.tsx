import React from 'react'

import * as S from './styles'

export const Item = () => {
  return (
    <S.ListItem>
      <S.ListInfo>
        <span>
          <strong>Ação:</strong> Inativação | <strong>Motivo:</strong> Atestado
          Médico | <strong>Origem:</strong> Cadastro
        </span>
        <span>
          <strong>Período:</strong> 21/09/2022 a 28/09/2022
        </span>
        <span>
          <strong>Responsável:</strong> Eudes Martins
        </span>
      </S.ListInfo>
      <S.ListRemove>
        <span>Remover</span>
      </S.ListRemove>
    </S.ListItem>
  )
}
