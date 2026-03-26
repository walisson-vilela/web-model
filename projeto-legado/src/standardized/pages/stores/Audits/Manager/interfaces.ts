type Address = {
  formatted: string
  postal_code: string
  street_type: string
  street_name: string
  street_number: string
  state_code: string
  city_name: string
  sublocality_name: string
}

export interface BodyInterface {
  /** ID da auditoria */
  id: number

  /** ID do PDV */
  store_id: number

  /** PDV */
  nickname_jsx: JSX.Element | null

  /** Bairro */
  sublocality_name: string

  /** Cidade */
  city_name: string

  /** Estado */
  state_code: string

  /** Auditado Por */
  created_by_jsx: string

  /** Função */
  created_by_role_jsx: string

  /** Data da Auditoria */
  created_at_jsx: string

  /** Endereço da auditoria */
  address: Address

  /** Coordenada da auditoria */
  coordinate: {
    lat: number
    lng: number
    radius: number
  }

  /** Dados do PDV */
  store: {
    id: number
    nickname: string
    source_radius: number

    /** Endereço do PDV */
    address: Address & {
      lat: number
      lng: number
    }

    /** Coordenada do PDV */
    coordinate: {
      lat: number
      lng: number
      radius: number
      tolerance: number
    }
  }

  /** Dados do auditor */
  creator: {
    name: string
    user?: {
      id: number
      role: {
        id: number
        name: string
      }
    }
  }

  /** Data/hora da Auditoria */
  created_at: Date

  /** Página que o registro pertence */
  page: number
  /** Índice do registro na página */
  index: number
}
