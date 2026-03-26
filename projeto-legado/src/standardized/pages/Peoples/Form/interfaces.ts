import type { Modifier } from '../../../components/form/components/Footer'
import type { IAddress } from '../../../components/form/sections/Address/interfaces'

export interface Form extends IAddress {
  /** Avatar */
  avatar: string | null

  /** Nome completo */
  name: string
  /** Data de nascimento */
  birthdate: string
  /** CPF */
  document: string
  /** Matrícula */
  registration: string
  /** Data de admissão */
  admission: string
  /** PIS */
  pis: string
  /** Setor de trabalho */
  sector: string

  /** Telefone 1 */
  phone: string
  /** Telefone 2 */
  phone_2: string

  /** E-mail */
  email: string

  /** Anotações gerais */
  note: string
}

export interface Data {
  id: number
  modifier: Modifier | null
}

export type Validations = {
  [k in keyof Pick<Form, 'document' | 'registration' | 'pis'>]: boolean | null
}
