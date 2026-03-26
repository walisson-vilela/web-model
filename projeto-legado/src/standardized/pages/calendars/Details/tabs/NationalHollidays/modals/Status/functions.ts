import type { Card, Data } from '../../../../components/types'

import type { CardsByStatus } from './types'

const filterPeriod = (card: Card) => {
  return (
    new Date(card.end).getTime() > new Date().getTime() ||
    card.events.some((e) => new Date(e.end).getTime() > new Date().getTime())
  )
}

const filters: { [k in keyof CardsByStatus]: (card: Card) => boolean } = {
  C: () => true,
  I: filterPeriod,
  IN: () => true,
  S: filterPeriod,
}

export const groupCards = (checked: Data[]): CardsByStatus => {
  const cards = checked.reduce<CardsByStatus>(
    (cards, month) => {
      return {
        ...cards,
        ...month.cards,
      }
    },
    {
      C: [],
      IN: [],
      I: [],
      S: [],
    },
  )

  return cards
}
