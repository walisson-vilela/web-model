import React from 'react'

import { CardComponent } from './components/cardComponent'
import { CardContextProvider } from './context'
import { CardInterface } from './interface'

export const Card = (card: CardInterface) => {
  return (
    <CardContextProvider cardProps={card}>
      <CardComponent />
    </CardContextProvider>
  )
}
