import { CardInterface } from '../../../Card/interface'

export interface StatusProps {
  approved: 'A' | 'R'
  images: CardInterface[]
}

export interface ClassificationProps {
  id: number | null
  name: string | null
}
