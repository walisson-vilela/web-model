import type { ReactNode } from 'react'

import type { CardView } from '../../../cardViewTypes'
import type { Card21Data } from '../../../types'

import * as S from './styles'

const formatInteger = (value: number) =>
  new Intl.NumberFormat('pt-BR', {
    maximumFractionDigits: 0,
  }).format(value)

export const buildCard21View = (data: Card21Data): CardView => {
  const title = 'Controle de Device'

  const content: ReactNode = (
    <S.Body>
      <S.Columns>
        <S.Column>
          <S.MainValue>{formatInteger(data.android)}</S.MainValue>
          <S.Label>Android</S.Label>
        </S.Column>

        <S.Divider />

        <S.Column>
          <S.MainValue>{formatInteger(data.ios)}</S.MainValue>
          <S.Label>iOS</S.Label>
        </S.Column>

        <S.Divider />

        <S.Column>
          <S.MainValue>{formatInteger(data.outdated_apps)}</S.MainValue>
          <S.Label>Apps Desatualizados</S.Label>
        </S.Column>
      </S.Columns>
    </S.Body>
  )

  return {
    title,
    content,
  }
}
