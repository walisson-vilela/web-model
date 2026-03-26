import type { Prettify } from '../../../../../utils/formatters'
import type {
  StepComponent as BaseStepComponent,
  StepComponentAttributes as BaseStepComponentAttributes,
  City,
  Region,
  State,
  Team,
  User,
} from '../../components/types'

export type AddressValue = {
  postal_code: string
  street_type: string
  street_address: string
  street_number: string
  complement: string
  sublocality: string
  city: string
  state: string
} & FormGeolocation

type Step1 = {
  name: string
  type: FormType
  check_in_required: boolean
} & AddressValue

type Step2 = {
  events: Event[]
}

type Step3 = {
  regions: Region[]

  teams: Team[]
  cities: City[]
  states: State[]
  users: User[]
}

export type Value = Prettify<Step1 & Step2 & Step3>

export type StepComponent = BaseStepComponent<Value>
export type StepComponentAttributes = BaseStepComponentAttributes<Value>
export type { StepComponentComponent } from '../../components/types'

export type FormProps = {
  card_id?: number
  close: () => void
  steps: { [K: string]: StepComponent }
}

export type FormGeolocation = {
  lat: number | ''
  lng: number | ''
  radius: number
  geolocation_at: string | null
  geolocation_by_id: number | null
  geolocation_by_name: string | null
}

export type FormType =
  | 'NATIONAL_HOLIDAY'
  | 'REGIONAL_HOLIDAY'
  | 'MEETING'
  | 'CONVETION'
  | 'COACHING'
  | 'VACATION'

export type Event = {
  id?: number
  start: string
  end: string
}

export type Events = {
  id: number
  start: Date
  end: Date
  users: User[]
  teams: Team[]
}
