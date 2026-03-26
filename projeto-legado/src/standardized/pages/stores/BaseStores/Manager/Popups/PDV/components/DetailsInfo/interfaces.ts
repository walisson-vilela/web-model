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

  markets: (string | null | undefined)[]

  otherInfo: { classification: string }
}
