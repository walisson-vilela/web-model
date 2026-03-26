import type { ReactNode } from 'react'

import type { CardView } from '../../../cardViewTypes'
import type { Card11Data } from '../../../types'

import * as S from './styles'

const formatDistance = (value: number) =>
  new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value)

export const buildCard11View = (data: Card11Data): CardView => {
  const content: ReactNode = (
    <S.Body>
      <S.Columns>
        <S.Column>
          <S.MainValue>{formatDistance(data.planned)}</S.MainValue>
          <S.Label>Previsto</S.Label>
        </S.Column>

        <S.Divider />

        <S.Column>
          <S.MainValue>{formatDistance(data.realized)}</S.MainValue>
          <S.Label>Realizado</S.Label>
        </S.Column>
      </S.Columns>
    </S.Body>
  )

  return {
    title: 'Distância Média (km)',
    content,
  }
}
