import type { ReactNode } from 'react'

import type { CardView } from '../../../cardViewTypes'
import type { Card18Data } from '../../../types'

import * as S from './styles'

const formatInteger = (value: number) =>
  new Intl.NumberFormat('pt-BR', {
    maximumFractionDigits: 0,
  }).format(value)

export const buildCard18View = (data: Card18Data): CardView => {
  const title = 'Ocorrência no PDV'

  const content: ReactNode = (
    <S.Body>
      <S.LeftColumn>
        <S.MonthLabel>Mês: {data.month}</S.MonthLabel>
        <S.TotalValue>{formatInteger(data.total)}</S.TotalValue>
      </S.LeftColumn>

      <S.Divider />

      <S.RightColumn>
        <S.InfoRow>Novos ({formatInteger(data.new)})</S.InfoRow>
        <S.InfoRow>Já visualizados ({formatInteger(data.viewed)})</S.InfoRow>
      </S.RightColumn>
    </S.Body>
  )

  return {
    title,
    content,
  }
}
