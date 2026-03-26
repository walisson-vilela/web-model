import { ColorOptions } from '@mw-kit/mw-ui/dist/theme/interfaces'

import { Card } from '../../../../components/types'
import { CardStatusConfig, CardStatusValues } from '../../../../types'

export type CardsByStatus = { [key in CardStatusValues]: Card[] }

export type Status = 'INACTIVATED' | 'ACTIVE'

export type Labels = {
  [Key in Status]: {
    target: CardStatusConfig[Exclude<Status, Key>]['value']
    name: string
    title: string
    message: string
    value: CardStatusConfig[Key]['value']
    errors: {
      ONLY: string
      AT_LEAST_ONE: string
    }
    color: ColorOptions
  }
}

export type StatusProps = {
  status: Status
  ids: CardsByStatus
  close: () => void
}
