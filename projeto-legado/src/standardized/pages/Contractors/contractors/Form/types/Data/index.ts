import { Modifier } from '../../../../../../components/form/components/Footer'
import { AssociatedUser } from '../../../../components/ResponsibleTeam/types'
import { IdName } from '../../../../types'
import { ContractorLicenses } from '../ContractorLicenses'

type IdNameNull = { [k in keyof IdName]: IdName[k] | null }

export interface Data {
  id: number | null

  active: number

  type: string | null

  avatar: {
    extension: string
    id: number
    name: string
    url: string
  } | null

  can_group: boolean | null
  grouped: boolean | null
  document: string | null
  subdomain: string | null
  cnpj: string | null
  name: string | null
  contractor_region_countries: number[]

  // address
  postal_code: string | null // cep
  street_type: string | null // tipo de logradouro
  street: string | null // endereco
  street_number: string | null // numero
  complement: string | null // complemento
  district: string | null // bairro
  locality: string | null // cidade
  state_short: string | null

  // geolocation
  lat: number | '' | null // latitude
  lng: number | '' | null // longitude
  radius: number | '' // raio

  geolocation_at: string | null
  geolocation_by_user: IdNameNull
  modifier: Modifier | null

  contractors_forms: {
    id: number | null
    contractor_id: number | null
    form_id: number | null
    form: {
      id: number | null
      name: string | null
    } | null
  }[]
  contractor_peoples: AssociatedUser[]

  contractor_terms: {
    id: number | null
    contractor_id: number | null
    type: number | null
    title: string | null
    content: string | null
    modified_at: string | null
  }[]

  allocated_users: number | null
  licenses: ContractorLicenses

  ppt_template:
    | ({
        id: number
        contents: {
          id: number
          template_id: number
          page: string
          color: string
        }[]
      } & Partial<{
        [key in 'single_file' | 'duo_file' | 'cover_file']: {
          id: number
          url: string
          name: string
          extension: string
        }
      }>)
    | null
}
