import type { ReactNode } from 'react'

import type { CardView } from '../../../cardViewTypes'
import type { Card15Data } from '../../../types'

import * as S from './styles'

const formatScore = (value: number) =>
  new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value)

const formatInteger = (value: number) =>
  new Intl.NumberFormat('pt-BR', {
    maximumFractionDigits: 0,
  }).format(value)

export const buildCard15View = (data: Card15Data): CardView => {
  const title = `Loja Modelo: Meta: ${formatScore(data.goal)}`

  const content: ReactNode = (
    <S.Body>
      <S.Columns>
        <S.Column>
          <S.MainValueRow>
            <S.MainValue>{formatScore(data.result)}</S.MainValue>
            <S.SecondaryValue>/{formatScore(data.max_score)}</S.SecondaryValue>
          </S.MainValueRow>
          <S.Label>Média Geral</S.Label>
        </S.Column>

        <S.Divider />

        <S.Column>
          <S.MainValueRow>
            <S.MainValue>{formatInteger(data.below_goal)}</S.MainValue>
            <S.SecondaryValue>PDVs</S.SecondaryValue>
          </S.MainValueRow>
          <S.Label>Abaixo da Meta</S.Label>
        </S.Column>

        <S.Divider />

        <S.Column>
          <S.MainValueRow>
            <S.MainValue>{formatInteger(data.above_goal)}</S.MainValue>
            <S.SecondaryValue>
              {data.above_goal === 1 ? 'PDV' : 'PDVs'}
            </S.SecondaryValue>
          </S.MainValueRow>
          <S.Label>Acima da Meta</S.Label>
        </S.Column>
      </S.Columns>
    </S.Body>
  )

  return {
    title,
    content,
  }
}
