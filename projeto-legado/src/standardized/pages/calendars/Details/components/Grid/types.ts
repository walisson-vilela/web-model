import type { MenuProps } from '../Menu/types'

export type Month = {
  id: number
  month_name: string
  cards_count: number
  events_count: number
}

export type Card = {
  id: number
  name: string
  type:
    | 'NATIONAL_HOLIDAY'
    | 'REGIONAL_HOLIDAY'
    | 'MEETING'
    | 'CONVENTION'
    | 'COACHING'
    | 'VACATION'
  type_label: string
  starts_at: Date
  ends_at: Date
  user_count: number
  subordinate_count: number

  children: CardTypeChildren[]

  creator: {
    name: string
  }
}

export type CardTypeChildren = {
  id: number
  parent_id: number
  starts_at: Date
  ends_at: Date
}

export type Data = Month & { cards: Card[] }

export type GetCardMenu = (card: Card) => MenuProps

export type GridProps = {
  getCardMenu?: GetCardMenu
}

export type Context = {
  getCardMenu: GetCardMenu
}

export type UserEvents = {
  hierarchy_count: number
  interrupted_at: Date | null

  user: {
    id: number
    name: string
    person: {
      id: number
      registration: string
    }
  }

  role: {
    id: number
    name: string
  }
}

export type UserOptions = {
  id: number
  name: string
  starts_at: string
  ends_at: string
}
