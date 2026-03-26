import { ReactNode } from 'react'

import type { CardView } from '../../../cardViewTypes'
import type { Card3Data } from '../../../types'
import * as S from './styles'

const formatNumber = (value: number) =>
  new Intl.NumberFormat('pt-BR').format(value)

const formatPercentage = (value: number) =>
  `${new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(value)}%`

export const buildCard3View = (data: Card3Data): CardView => {
  const title = 'Usuários Ativos Desconectados'

  const content: ReactNode = (
    <S.Body>
      <S.Line>
        Atendimento Iniciado: {formatNumber(data.started)}/
        {formatNumber(data.total_users)} ({formatPercentage(
          data.started_percentage,
        )}
        )
      </S.Line>

      <S.Line>
        Não Iniciou Atendimento: {formatNumber(data.no_started)}/
        {formatNumber(data.total_users)} ({formatPercentage(
          data.no_started_percentage,
        )}
        )
      </S.Line>
    </S.Body>
  )

  const footer = (
    <S.Footer>
      +2 horas ({formatNumber(data.two_hours)}) | +4 Horas (
      {formatNumber(data.four_hours)}) | +1 dia ({formatNumber(data.one_day)})
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
    title,
    content,
    footer,
    status: {
      color: data.status_color,
      tooltip,
    },
  }
}
