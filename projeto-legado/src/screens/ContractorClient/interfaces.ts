import { IntlTelInputState } from '../../components/IntlTelInput'
import { Modifier } from '../../standardized/components/form/components/Footer'

export interface ContactInterface {
  id: number | null
  client_id: number | null
  client_contact_type_id: number | null
  name: string | null
  phone1: string | null
  phone2: string | null
  email: string | null
}

export interface DataInterface {
  id: number | null
  document: string | null
  company_name: string | null
  name: string | null
  category: {
    id: number
    name: string
  }
  modifier: Modifier | null
  state_registration: string | null
  municipal_registration: string | null
  client_category_id: number | null
  postal_code: string | null
  street_type: string | null
  street_address: string | null
  street_number: string | null
  complement: string | null
  sublocality: string | null
  city: string | null
  state: string | null
  phone1: string | null
  phone2: string | null
  email: string | null
  total_licences: number | null
  minimum_licenses: number | null
  licenses_in_use: number | null
  administrator_name: string | null
  administrator_phone: string | null
  administrator_sector: string | null
  administrator_email: string | null
  status: string | null
  account_master_id: number | null
  space_used: number | null
  space_free: number | null
  space_total: number | null
  automatic_user_approval: boolean | null
  administrator_id: number | null
  created_at: string | null
  account_master: {
    id: number | null
    name: string | null
  } | null
  client_contacts: ContactInterface[] | null
  administrator: {
    id: number | null
    name: string | null
    phone: string | null
    email: string | null
    decoded_json_fields: any | null
  } | null
}

export interface FormInterface {
  // general contact
  phone1: string
  phone2: string
  email: string

  // master administrator
  administrator_phone: string

  // financial contact
  client_contact_4_name: string
  client_contact_4_phone1: string
  client_contact_4_phone2: string
  client_contact_4_email: string

  // complement data - Sponsor
  client_contact_6_name: string
  client_contact_6_phone1: string
  client_contact_6_phone2: string
  client_contact_6_email: string

  // complement data - Ponto Focal
  client_contact_8_name: string
  client_contact_8_phone1: string
  client_contact_8_phone2: string
  client_contact_8_email: string

  // complement data - TI
  client_contact_10_name: string
  client_contact_10_phone1: string
  client_contact_10_phone2: string
  client_contact_10_email: string

  // complement data - Compras
  client_contact_12_name: string
  client_contact_12_phone1: string
  client_contact_12_phone2: string
  client_contact_12_email: string
}

export interface FormInfoInterface {
  // general contact
  phone1: IntlTelInputState
  phone2: IntlTelInputState

  // master administrator
  administrator_phone: IntlTelInputState

  // financial contact
  client_contact_4_phone1: IntlTelInputState
  client_contact_4_phone2: IntlTelInputState

  // complement data - Sponsor
  client_contact_6_phone1: IntlTelInputState
  client_contact_6_phone2: IntlTelInputState

  // complement data - Ponto Focal
  client_contact_8_phone1: IntlTelInputState
  client_contact_8_phone2: IntlTelInputState

  // complement data - TI
  client_contact_10_phone1: IntlTelInputState
  client_contact_10_phone2: IntlTelInputState

  // complement data - Compras
  client_contact_12_phone1: IntlTelInputState
  client_contact_12_phone2: IntlTelInputState
}

export interface MasterAdminInterface {
  id: number
  name: string
  phone: string | null
  work_phone: string | null
  mobile_phone: string | null
  mobile_phone_2: string | null
  email: string | null
  sector: string | null
  people_id_name: string
}

export interface ClientLicenses {
  id?: number | null
  client_id?: number | null
  type?: number | null
  total?: number | null
  reserved?: number | null
  available?: number | null
  consumed?: number | null
  consumed_percent?: number | null
  type_text?: string | null
}

export interface ContractInfoInterface {
  id?: number | null
  total_licences?: number | null
  minimum_licenses?: number | null
  licenses_in_use?: number | null
  client_licenses?: ClientLicenses[] | null
}
