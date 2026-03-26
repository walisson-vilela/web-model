import { IntlTelInputState } from '../../components/IntlTelInput'
import { Modifier } from '../../standardized/components/form/components/Footer'

// interface chamada a api

export interface Data {
  id: number

  username: string // login
  name: string // nome do usuário
  document: string // cpf
  pis: string // pis
  birthday: string // nascimento
  re: string // re
  admission: string // data admissão
  sector: string // setor
  street_type: string //  logradouro
  street_address: string
  street_number: string
  complement: string
  sublocality: string
  city: string
  state: string
  postal_code: string
  phone: string
  mobile_phone: string
  email: string
  avatar: {
    avatar: string
  }

  modifier: Modifier | null
}

export interface Form {
  avatar: string
  phone: string
  mobile_phone: string
  email: string
}

// interface do componente pessoa Júridica o I na frente é para referênciar que isso é uma interface

export interface Info {
  phone: IntlTelInputState
  mobile_phone: IntlTelInputState
}
