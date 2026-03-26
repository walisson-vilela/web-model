import type { ReactNode } from 'react'

import type { CardView } from '../../../cardViewTypes'
import type { Card20Data } from '../../../types'

import * as S from './styles'

const formatInteger = (value: number) =>
  new Intl.NumberFormat('pt-BR', {
    maximumFractionDigits: 0,
  }).format(value)

const formatPercentage = (value: number) =>
  `${new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value)}%`

export const buildCard20View = (data: Card20Data): CardView => {
  const title = 'Check-In/Out Por Foto'

  const content: ReactNode = (
    <S.Body>
      <S.Columns>
        <S.Column>
          <S.MainRow>
            <S.MainValue>{formatInteger(data.check_in)}</S.MainValue>
            <S.SecondaryValue>
              ({formatPercentage(data.check_in_percentage)})
            </S.SecondaryValue>
          </S.MainRow>
          <S.Label>Check-in</S.Label>
        </S.Column>

        <S.Divider />

        <S.Column>
          <S.MainRow>
            <S.MainValue>{formatInteger(data.check_out)}</S.MainValue>
            <S.SecondaryValue>
              ({formatPercentage(data.check_out_percentage)})
            </S.SecondaryValue>
          </S.MainRow>
          <S.Label>Check-out</S.Label>
        </S.Column>
      </S.Columns>
    </S.Body>
  )

  return {
    title,
    content,
  }
}
