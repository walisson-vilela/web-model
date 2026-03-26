import { RouteTabContextProps } from '../../../../../../../routes/types'

export type BodyInterface = {
  id: number
  nickname: string
  address: JSX.Element
  document: string | null
}

export type GetByCoordinateResponse = {
  data: BodyInterface[]
  pagination: {
    has_next_page: boolean
    count: number
  }
}

export type LocatedStoresProps = {
  lat: number
  lng: number
  onClose: () => void
  closeTab: RouteTabContextProps['close']
} & GetByCoordinateResponse
