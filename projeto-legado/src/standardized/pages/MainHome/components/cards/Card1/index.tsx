import { ReactNode } from 'react'

import type { Card1Data } from '../../../types'
import type { CardView } from '../../../cardViewTypes'
import * as S from './styles'

const formatNumber = (value: number) =>
  new Intl.NumberFormat('pt-BR').format(value)

const formatPercentage = (value: number) =>
  `${new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(value)}%`

export const buildCard1View = (data: Card1Data): CardView => {
  const title = `Usuários Ativos: ${formatNumber(
    data.actives,
  )} | Inativos Temporário: ${formatNumber(data.inactives)}`

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

  const content: ReactNode = (
    <S.Body>
      <S.Line>
        Roteiros Cobertos: {formatNumber(data.covered_routes)} | Descobertos:{' '}
        {formatNumber(data.uncovered_routes)} ({formatNumber(data.total_routes)})
      </S.Line>
      <S.LineAccent>
        Usuários Ativos s/roteiro: {formatNumber(data.without_route)}
      </S.LineAccent>
    </S.Body>
  )

  const footer = (
    <S.Footer>
      <span>Cobertura dos roteiros:</span>
      <S.FooterValue $color={data.status_color}>
        {formatPercentage(data.coverage_percentage)}
      </S.FooterValue>
      <span>
        ({formatNumber(data.covered_routes)}/{formatNumber(data.total_routes)})
      </span>
    </S.Footer>
  )

  return {
    title,
    content,
    footer,
    status: {
      color: data.status_color,
      tooltip,
    },
  }
}
