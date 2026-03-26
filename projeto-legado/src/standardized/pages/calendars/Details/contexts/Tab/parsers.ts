import moment from 'moment'

import {
  dateOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../utils/Formatters'
import { isOneOf } from '../../../../../../utils/Validators'
import { isObject } from '../../../../../utils/validators'
import type { Card, CardTypeChildren, Data } from '../../components/Grid/types'

const getMonths = (): Data[] => {
  const months = Array.from({ length: 12 }, (_, month) => {
    const date = moment().month(month).format('MMMM')
    return {
      id: month + 1,
      month_name: date,
      cards_count: 0,
      events_count: 0,
      cards: [],
    } as Data
  })

  return months
}

const parserCardTypeChildren = (data: unknown): CardTypeChildren[] => {
  if (!Array.isArray(data)) return []

  const children = data
    .reduce<CardTypeChildren[]>((acc, item) => {
      if (!isObject(item)) return acc
      const itemId = numberOrDefault(item.id)
      const parentId = numberOrDefault(item.parent_id)
      if (!itemId || !parentId) return acc

      const startsAt = dateOrDefault(
        item.starts_at,
        null,
        'YYYY-MM-DD HH:mm:ss',
      )
      const endsAt = dateOrDefault(item.ends_at, null, 'YYYY-MM-DD HH:mm:ss')
      if (!startsAt || !endsAt) return acc

      acc.push({
        id: itemId,
        parent_id: parentId,
        starts_at: new Date(startsAt),
        ends_at: new Date(endsAt),
      })
      return acc
    }, [])
    .sort((a, b) => {
      if (a.starts_at.getTime() === b.starts_at.getTime()) {
        if (a.ends_at.getTime() === b.ends_at.getTime()) {
          return 0
        }

        return a.ends_at.getTime() > b.ends_at.getTime() ? 1 : -1
      }

      return a.starts_at.getTime() > b.starts_at.getTime() ? 1 : -1
    })

  return children
}

const cardsParser = (data: unknown[]): Card[] => {
  return data.reduce<Card[]>((cards, item) => {
    if (!isObject(item)) return cards
    const itemId = numberOrDefault(item.id)
    if (!itemId) return cards

    const type = notEmptyStringOrDefault(item.type)
    if (
      !type ||
      !isOneOf(type, [
        'NATIONAL_HOLIDAY',
        'REGIONAL_HOLIDAY',
        'MEETING',
        'CONVENTION',
        'COACHING',
        'VACATION',
      ])
    ) {
      return cards
    }

    const startsAt = dateOrDefault(item.starts_at, null, 'YYYY-MM-DD HH:mm:ss')
    const endsAt = dateOrDefault(item.ends_at, null, 'YYYY-MM-DD HH:mm:ss')
    if (!startsAt || !endsAt) return cards

    const card: Card = {
      id: itemId,
      type,
      name: notEmptyStringOrDefault(item.name, ''),
      type_label: notEmptyStringOrDefault(item.type_label, ''),
      starts_at: new Date(startsAt),
      ends_at: new Date(endsAt),
      user_count: numberOrDefault(item.user_count, 0),
      subordinate_count: 0,

      children: parserCardTypeChildren(item.children),

      creator: {
        name: '',
      },
    }

    card.subordinate_count = numberOrDefault(
      item.subordinate_count,
      card.user_count,
    )

    if (isObject(item.creator)) {
      card.creator.name = notEmptyStringOrDefault(
        item.creator.name,
        card.creator.name,
      )
    }

    cards.push(card)
    return cards
  }, [])
}

export const eventParser = (data: unknown[]): Data[] => {
  const months = getMonths()

  return data.reduce<Data[]>((acc, item) => {
    if (!isObject(item)) return acc

    const cards = cardsParser([item] as unknown[])
    for (const card of cards) {
      const index = new Date(card.starts_at).getMonth()
      if (months[index]) {
        months[index].cards.push(card)
        months[index] = {
          ...months[index],
          cards_count: months[index].cards_count + 1,
          events_count: months[index].events_count + 1 + card.children.length,
        }
      }
    }

    return acc
  }, months)
}
