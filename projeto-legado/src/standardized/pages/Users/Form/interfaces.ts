import { Modifier } from '../../../components/form/components/Footer'
import { WorkShift } from '../../WorkShifts/types'
import { PERSON_STATUS, TRAVEL_MODE } from '../labels'

export type Role = {
  id: number
  name: string
  internal_access: boolean
  access_level_id: number
  access_level_label: string
  hierarchies: { id: number; name: string }[]
  licenses: number
}

export type User = {
  id: number
  name: string
  role: Role
}

export type Superior = {
  id: number
  name: string
  role: {
    id: number
    name: string
  }
}

export type Region = {
  id?: number
  region_id: number
  name: string
}

export type Hierarchy = {
  id?: string
  hierarchy_id: number
  name: string
  /** Superior direto */
  superior: Superior | null
  /** Áreas de Atuação */
  regions: Region[]
  /** Tipo da decisão */
  manual: boolean
  /** Data da última modificação */
  modified_at: string
}

export type RouteContractor = {
  id: number
  nickname: string
}

export type Form = {
  /** Status */
  status: keyof typeof PERSON_STATUS

  /** Substituição do usuário */
  replace: {
    /** Usuário a ser substituído */
    user: User | null
    /** O que será espelhado */
    items: string[]
  } | null

  /** Função */
  role: Role | null

  /** senha */
  password: string

  /** pilares */
  hierarchies: Hierarchy[]

  /** Conta/Grupo */
  route_contractor: RouteContractor | null

  /** Tipo Dispositivo Móvel */
  personal_mobile: boolean
  /** N° de Série */
  imei: string | null

  /** Forma de deslocamento */
  travel_mode: keyof typeof TRAVEL_MODE | null

  /** Distancia do deslocamento à pé (metros) */
  less_walking: number

  host_city: {
    id: number
    name: string
    state: {
      id: number
      name: string
    }
    country: {
      id: number
      name: string
    }
  } | null

  /** Utiliza marcação de ponto eletrônico como registro */
  electronic_point: boolean
  /** Turno de Trabalho */
  work_shift: WorkShift | null
}

export interface Data {
  /** ID */
  id: number

  /** Nome */
  name: string
  /** CPF */
  document: string
  /** Matrícula */
  registration: string | null

  /** Eventos */
  event_count: number
  event_user: {
    event: {
      id: number
      /* Tipo do evento */
      type: string

      /* Período */
      starts_at: string
      ends_at: string | null

      /* Motivo */
      name: string
      classification: {
        name: string
      } | null
    } | null

    /* Ação realizada por */
    creator: {
      name: string
    }
  } | null

  /** Ultima modificação */
  modifier: Modifier | null
  pis: string | null
}

export type Labels = Partial<{
  [k in keyof Form]: {
    label?: string
    placeholder?: string
    required?: boolean
  }
}>

export type { WeekdayType, WorkShift } from '../../WorkShifts/types'
