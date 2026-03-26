import { ReactNode } from 'react'

import type { CardView } from '../../../cardViewTypes'
import type { Card5Data } from '../../../types'
import * as S from './styles'

const formatNumber = (value: number) =>
  new Intl.NumberFormat('pt-BR').format(value)

const formatPercentage = (value: number) =>
  `${new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(value)}%`

export const buildCard5View = (data: Card5Data): CardView => {
  const content: ReactNode = (
    <S.Body>
      <S.Line>
        Alto: {formatNumber(data.high)} ({formatPercentage(
          data.high_percentage,
        )}
        ) | Médio: {formatNumber(data.medium)} ({formatPercentage(
          data.medium_percentage,
        )}
        ) | Baixo: {formatNumber(data.low)} ({formatPercentage(
          data.low_percentage,
        )}
        )
      </S.Line>
    </S.Body>
  )

  const footer = (
    <S.Footer>
      Consumo Médio Atual: {formatPercentage(data.average_consumption)} por hora
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
    title: 'Nível de Bateria',
    content,
    footer,
    status: {
      color: data.status_color,
      tooltip,
    },
  }
}
