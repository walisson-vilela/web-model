import { SourceStatus } from '../../types'

export interface BodyInterface {
  /** ID */
  id: number

  /** PDV */
  nickname: string
  nickname_jsx: JSX.Element

  /** CNPJ PDV */
  document: string | null

  /** Endereço */
  source_status: SourceStatus
  address_formatted: string
  address_postal_code: string
  address_formatted_jsx: JSX.Element

  /** Bandeira */
  market_flag_name: string | null
  market_flag_name_jsx: JSX.Element | null

  /** Grupo */
  market_group_name: string | null

  /** Rede */
  market_network_name: string | null

  /** Canal */
  segment_name: string | null

  /** Tipologia */
  typology_name: string | null

  /** Conta */
  contractor_count: number
  contractor_count_jsx: JSX.Element | null
}
