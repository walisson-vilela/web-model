import { Card } from '../components/types'

export type CardModal = React.VoidFunctionComponent<{
  card: Card
  close: () => void
}>

export type { FormProps } from './Form/types'
