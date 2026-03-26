import { Modifier } from '../../../../components/form/components/Footer'
import { AuditHistory } from '../../../../components/form/sections/Address/interfaces'
import { SourceStatus } from '../../types'

interface IdName {
  id: number
  name: string
}

interface IMarketFlag extends IdName {
  network: string
  group: string
}

export interface ContactRecipient {
  name: string
  phone_1: string
  phone_2: string
  email: string
}

interface ISourceAddress {
  formatted: string
  lat: number
  lng: number
  postal_code: string
  street_type: string
  street_address: string
  street_number: string
  complement: string
  sublocality: string
  city: string
  state: string

  valid_geolocation?: boolean
}

export interface Form {
  id: number | null
  status: boolean
  document: string | null
  fantasy_name: string | null
  company_name: string | null
  situation_name: string | null

  source_status: SourceStatus
  source_address: ISourceAddress | null

  code: string | null
  nickname: string
  segment: IdName | null
  market_flag: IMarketFlag | null
  typology: IdName | null
  classification: IdName | null
  checkout: string | null
  postal_code: string
  street_type: string
  street_address: string
  street_number: string
  complement: string
  sublocality: string
  city: string
  state: string
  address_lat: number | null
  address_lng: number | null
  lat: number | null
  lng: number | null
  radius: number
  geolocation_tolerance: number
  geolocation_status: boolean | null
  geolocation_at: string | null
  geolocation_by_id: number | null
  geolocation_by_name: string | null
  phone: string
  email: string
  manager_contact: ContactRecipient
  person_in_charge_1_contact: ContactRecipient
  person_in_charge_2_contact: ContactRecipient
}

export interface Data {
  id: number

  modifier: Modifier | null

  audits: AuditHistory[]
}

export type Validations = {
  [k in keyof Pick<Form, 'document' | 'code' | 'nickname'>]: boolean | null
}

export interface IFormStores {
  mode: 'stores' | 'base-stores'
}
