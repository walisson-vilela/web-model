import { MwButton } from '@mw-kit/mw-ui'

import { GridSelectorProps } from '../interfaces'

export type TContent<T> = {
  title: React.ReactNode
  gridSelector: GridSelectorProps<T>
  button?: Parameters<typeof MwButton>[0] | React.ReactNode
  footer?: React.ReactNode
}
