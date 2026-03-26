import { ReactNode } from 'react'

import {
  CircleProps,
  GoogleMapProps,
  MarkerProps,
  PolygonProps,
} from '@react-google-maps/api'

import { MarkerIcon } from './Marker/icons'

export type CircleInterface = Pick<Required<CircleProps>, 'radius'> &
  Pick<CircleProps, 'options'>

export type MarkerInterface = Pick<MarkerProps, 'clickable'> & {
  /** coordenada do marcador */
  lat: number
  /** coordenada do marcador */
  lng: number
  /** posicao no eixo Z do marcador */
  zIndex?: number
  /** se o marcador pode ser movido */
  draggable?: boolean
  /** icone do marcador */
  icon?: MarkerIcon
  /** callback executada ao soltar o marcador */
  onDragEnd?: (event: any, lat: number, lng: number) => void
  /** callback executada ao clicar no marcador */
  onClick?: (
    e: google.maps.MapMouseEvent,
    position: DOMRect | undefined,
  ) => void
  /** raio do marcador */
  circle?: CircleInterface
  /** configuracao do componente InfoWindow do marcador */
  infoWindow?: {
    content: JSX.Element
    active: boolean
    pixelOffset?: [number, number]
  }
  bound?: CircleInterface & {
    lat: number
    lng: number
  }
}

export interface Bound {
  lat: number
  lng: number
  radius?: number
}

export interface PropTypes {
  mode?: 'roadmap' | 'satellite' | 'hybrid'
  loading?: boolean
  hideUI?: boolean
  zoom?: number
  markers?: MarkerInterface | MarkerInterface[]
  polygons?: (PolygonProps & {
    path: Omit<Bound, 'radius'>[]
  })[]
  defaultOptions?: google.maps.MapOptions
  defaultCenter?: google.maps.LatLng | google.maps.LatLngLiteral
  /** @deprecated after upgrading google maps this is no longer being used */
  loadingElement?: ReactNode
  containerStyles?: GoogleMapProps['mapContainerStyle']
  circles?: (CircleProps & {
    center: {
      lat: number
      lng: number
    }
    radius: number
  })[]
}
