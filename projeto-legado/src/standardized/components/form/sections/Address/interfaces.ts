import type { MarkerInterface } from '../../../../../components/GoogleMap/interfaces'
import type { AddressType } from '../../../../constants/addressType'
import type { UfAcronym } from '../../../../constants/uf'

export interface ICoordinates {
  lat?: number | null
  lng?: number | null
  radius: number

  geolocation_at?: string | null
  geolocation_by_id?: number | null
  geolocation_by_name?: string | null
  geolocation_status?: boolean | null
  geolocation_tolerance?: number
}

export interface IAddress extends ICoordinates {
  postal_code: string
  street_type: AddressType | string
  street_address: string
  street_number: string
  complement?: string
  sublocality: string
  city: string
  state: UfAcronym | string
  address_lat?: number | null
  address_lng?: number | null
}

export interface ComponentProps {
  form: any // TODO: Trocar any por form
  viewMode?: boolean
  withGeolocationStatus?: true
  withAddressCoordinate?: true
  disabled?: boolean
  markers?: MarkerInterface[]
  audits?: AuditHistory[]
  showTitle?: boolean
  modalMode?: boolean
}

export type AuditHistory = {
  created_by: string
  created_at: Date
  lat: number
  lng: number
  radius: number
}
