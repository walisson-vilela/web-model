export interface StoreProps {
  id: number
  stores_contractor: {
    nickname: string
    market_flag?: { name: string; id: number }
  }
  address: {
    formatted: string
    postal_code: string
  }
}
