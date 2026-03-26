import type { Card } from '../../components/types'

export type PresenceListHistoryProps = {
  card: Card
  close: () => void
}

export type PresenceListHistoryContextProps = {
  card: Card
}
