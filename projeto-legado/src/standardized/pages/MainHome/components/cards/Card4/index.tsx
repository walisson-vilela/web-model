import { ReactNode } from 'react'

import type { CardView } from '../../../cardViewTypes'
import type { Card4Data } from '../../../types'
import * as S from './styles'

const formatNumber = (value: number) =>
  new Intl.NumberFormat('pt-BR').format(value)

const formatPercentage = (value: number) =>
  `${new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)}%`

const formatTwoDigits = (value: number) => String(value).padStart(2, '0')

export const buildCard4View = (data: Card4Data): CardView => {
  const title = `Atendimentos Totais: ${formatNumber(
    data.total_attendances,
  )} (PDV's)`

  const content: ReactNode = (
    <S.Body>
      <S.Line>
        Previsto: {formatNumber(data.planned)} | Adicionado:{' '}
        {formatNumber(data.not_planned)}
      </S.Line>
      <S.Line>Justificados: {formatTwoDigits(data.justified)}</S.Line>
      <S.Row>
        <S.RowItem>Em Andamento: {formatNumber(data.in_progress)}</S.RowItem>
        <S.RowItem $align="right">
          Realizado: {formatNumber(data.realized)} (
          {formatPercentage(data.performance)})
        </S.RowItem>
      </S.Row>
    </S.Body>
  )

  const tooltip =
    data.legend?.values && data.legend.values.length > 0
      ? {
          title: data.legend.title,
          items: data.legend.values.map((item) => ({
            color: item.color,
            label: item.label,
          })),
        }
      : undefined

  return {
    title,
    content,
    status: {
      color: data.status_color,
      tooltip,
    },
  }
}
