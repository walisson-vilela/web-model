import { GenericObject } from '@mw-kit/mw-ui/types'

import { Details } from '../../interface'

export interface ITableDetails {
  display: IDisplay
  data: Details
}

export interface IDisplay {
  id: string | number | null
  name: string
  document: string
  address: { formatted: string; postal_code: string } | null
  phones: GenericObject[]
  markets: (string | null | undefined)[]
  contact: string
  history: {
    performed: number
    planned: number
    percent: number
    attendances: { first: GenericObject | null; last: GenericObject | null }
  }
  otherInfo: { classification: string; checkouts: string }
}
