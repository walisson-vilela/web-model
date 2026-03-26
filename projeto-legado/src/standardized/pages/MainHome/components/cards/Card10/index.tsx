import type { ReactNode } from 'react'

import type { CardView } from '../../../cardViewTypes'
import type { Card10Data } from '../../../types'

import * as S from './styles'

export const buildCard10View = (data: Card10Data): CardView => {
  const content: ReactNode = (
    <S.Body>
      <S.Columns>
        <S.Column>
          <S.MainValue>IDC {data.idc}</S.MainValue>
          <S.Label>Índice de Desempenho do Colaborador</S.Label>
        </S.Column>

        <S.Divider />

        <S.Column>
          <S.MainValue>{data.productivity}%</S.MainValue>
          <S.Label>% de Produtividade</S.Label>
        </S.Column>
      </S.Columns>
    </S.Body>
  )

  return {
    title: 'Avaliação de Desempenho',
    content,
  }
}
