import { ReactNode } from 'react'

import type { CardView } from '../../../cardViewTypes'
import type { Card6Data } from '../../../types'
import * as S from './styles'

const formatNumber = (value: number) =>
  new Intl.NumberFormat('pt-BR').format(value)

export const buildCard6View = (data: Card6Data): CardView => {
  const content: ReactNode = (
    <S.Body>
      <S.Line>
        Dados Pendentes: Pesquisa {formatNumber(data.registries)} | Foto{' '}
        {formatNumber(data.photos)}
      </S.Line>
    </S.Body>
  )

  const footer = (
    <S.Footer>
      Impactados: {formatNumber(data.users_impacted)} Usuários
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
    title: 'Nível de Conexão',
    content,
    footer,
    status: {
      color: data.status_color,
      tooltip,
    },
  }
}
