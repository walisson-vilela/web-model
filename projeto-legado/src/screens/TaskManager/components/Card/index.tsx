import React from 'react'

import { Card as CardProps } from '../../interfaces'

import { CardHeader, Details, GraphicArea, PointOfImpact } from './components'
import { CardContainer } from './styles'

interface CardComponentProps {
  key?: number
  card: CardProps
}

export const Card = ({ card }: CardComponentProps): JSX.Element => {
  return (
    <CardContainer color={card.color}>
      <CardHeader data={card} />
      <GraphicArea data={card} />
      <Details data={card} />
      <PointOfImpact data={card} />
    </CardContainer>
  )
}
