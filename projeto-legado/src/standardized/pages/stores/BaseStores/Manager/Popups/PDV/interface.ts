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

  classification: string | null

  segment: {
    id: number
    name: string
  } | null
}

export interface StoreDetailsProps {
  store_id: number
  name: string
}
