import { GenericObject } from '@mw-kit/mw-ui/types'

export interface Details {
  id: number | null
  name: string | null
  document: string | null
  flag: {
    id: number
    name: string
  } | null
  network: string | null
  group: string | null
  address: { formatted: string; postal_code: string } | null
  phones: GenericObject[] | null
  contact: string | null
  history: {
    planned: number | null
    performed: number | null
    attendances: {
      first: GenericObject | null
      last: GenericObject | null
    }
  }
  classification: string | null
  checkouts: string | null
  segment: {
    id: number
    name: string
  } | null
}

export interface StoreDetailsProps {
  store_id: number
  name: string
}
