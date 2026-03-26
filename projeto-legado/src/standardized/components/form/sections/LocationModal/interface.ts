import {
  Bound,
  MarkerInterface,
} from '../../../../../components/GoogleMap/interfaces'
import { AuditHistory } from '../Address/interfaces'

type AddressData = {
  postal_code: string
  street_type: string
  street_address: string
  street_number: string
  complement: string
  sublocality: string
  city: string
  state: string
}

type Coordinates = {
  lat: number | null
  lng: number | null
  radius: number
}

export type Form = AddressData & Coordinates

type CommonProps = {
  value: Form
  close: () => void
  save: (values: Form) => void
  account_name?: string
}

export type WithFormProps = CommonProps & {
  mode: 'with_form'
  polygon?: Omit<Bound, 'radius'>[]
}

export type OnlyMapProps = CommonProps & {
  mode: 'only_map'
  bound?: MarkerInterface['bound']
  audits?: AuditHistory[]
}

export type Props = WithFormProps | OnlyMapProps
