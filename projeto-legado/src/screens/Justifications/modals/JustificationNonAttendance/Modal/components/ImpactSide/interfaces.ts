export interface StoreImpactedProps {
  id: number
  name: string
  formatted_address: string
  segment: {
    id: number
    name: string
  }
  market_flag: {
    id: number
    name: string
  }
  attendances: string[]
}
