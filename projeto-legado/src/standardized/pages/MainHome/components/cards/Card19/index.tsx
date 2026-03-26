import type { ReactNode } from 'react'

import type { CardView } from '../../../cardViewTypes'
import type { Card19Data } from '../../../types'

import * as S from './styles'

const formatInteger = (value: number) =>
  new Intl.NumberFormat('pt-BR', {
    maximumFractionDigits: 0,
  }).format(value)

export const buildCard19View = (data: Card19Data): CardView => {
  const title = 'Atendimento iniciado - Posição GPS Fora Raio'

  const content: ReactNode = (
    <S.Body>
      <S.Value>{formatInteger(data.occurrences)}</S.Value>
      <S.Label>(Ocorrências)</S.Label>
    </S.Body>
  )

  return {
    title,
    content,
  }
}
