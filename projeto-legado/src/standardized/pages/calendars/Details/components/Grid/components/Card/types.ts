import type { Card, Data } from '../../types'

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  data: Card
  month: Data
}
