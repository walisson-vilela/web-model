import { ReactNode } from 'react'

import type { CardView } from '../../../cardViewTypes'
import type { Card2Data } from '../../../types'
import * as S from './styles'

const formatNumber = (value: number) =>
  new Intl.NumberFormat('pt-BR').format(value)

const formatPercentage = (value: number) =>
  `${new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(value)}%`

export const buildCard2View = (data: Card2Data): CardView => {
  const content: ReactNode = (
    <S.Body>
      <S.Line>
        Usuários: {formatNumber(data.no_attendance)}/
        {formatNumber(data.total_users)}
      </S.Line>
    </S.Body>
  )

  const footer = (
    <S.Footer>
      <span>Aderência ao atendimento:</span>
      <S.FooterValue $color={data.status_color}>
        {formatPercentage(data.adherence)}
      </S.FooterValue>
    </S.Footer>
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
    title: 'Não Iniciaram Atendimento',
    content,
    footer,
    status: {
      color: data.status_color,
      tooltip,
    },
  }
}
