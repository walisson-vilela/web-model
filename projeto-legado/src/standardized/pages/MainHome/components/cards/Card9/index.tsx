import { ReactNode } from 'react'

import type { CardView } from '../../../cardViewTypes'
import type { Card9Data } from '../../../types'

import * as S from './styles'

export const buildCard9View = (data: Card9Data): CardView => {
  const content: ReactNode = (
    <S.Body>
      <S.MoodsRow>
        <S.MoodItem>
          <S.MoodIcon
            src='/assets/icons/mood/mood_very_bad.svg'
            alt='Muito ruim'
          />
          <S.MoodValue>{data.very_bad}</S.MoodValue>
        </S.MoodItem>

        <S.MoodItem>
          <S.MoodIcon src='/assets/icons/mood/mood_bad.svg' alt='Ruim' />
          <S.MoodValue>{data.bad}</S.MoodValue>
        </S.MoodItem>

        <S.MoodItem>
          <S.MoodIcon src='/assets/icons/mood/mood_neutral.svg' alt='Neutro' />
          <S.MoodValue>{data.neutral}</S.MoodValue>
        </S.MoodItem>

        <S.MoodItem>
          <S.MoodIcon src='/assets/icons/mood/mood_good.svg' alt='Bom' />
          <S.MoodValue>{data.good}</S.MoodValue>
        </S.MoodItem>

        <S.MoodItem>
          <S.MoodIcon src='/assets/icons/mood/mood_great.svg' alt='Ótimo' />
          <S.MoodValue>{data.great}</S.MoodValue>
        </S.MoodItem>
      </S.MoodsRow>
    </S.Body>
  )

  return {
    title: 'Humor',
    content,
  }
}
