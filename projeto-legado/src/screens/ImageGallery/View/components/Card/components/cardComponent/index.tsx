import React, { useContext } from 'react'

import { GalleryViewContext } from '../../../../context'
import { CardContext } from '../../context'
import { CardBack } from '../cardBack'
import { CardFront } from '../cardFront'
import { CardHeader } from '../cardHeader'

import * as S from './styles'

export const CardComponent = () => {
  const { cardProps, flip } = useContext(CardContext)
  const { columnsPerRow } = useContext(GalleryViewContext)

  return (
    <S.CardContainer
      flip={flip}
      flex={columnsPerRow === 3 ? 'column' : 'row'}
      type={cardProps.card.tags.find((item) => item.name === 'status').value}
    >
      <div className='face front'>
        <CardHeader />
        <S.Divider flex={columnsPerRow === 3 ? 'column' : 'row'}>
          <CardFront />
        </S.Divider>
      </div>
      <div className='face back'>
        <CardHeader />
        <S.Wrapper>
          <CardBack />
        </S.Wrapper>
      </div>
    </S.CardContainer>
  )
}
