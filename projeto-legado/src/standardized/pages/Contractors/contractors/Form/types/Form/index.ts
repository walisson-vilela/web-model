import { AssociatedUser } from '../../../../components/ResponsibleTeam/types'
import { IdName } from '../../../../types'
import { BodyInterface } from '../../components/FormDefinition/AssociateFormModal/Manager/interfaces'
import { ContractorLicenses } from '../ContractorLicenses'
import { PPTTemplates } from '../PPTTemplates'
import { Term } from '../Terms'

export interface Form {
  // status
  active: 1 | 0

  avatar: string | null // avatar

  // basic data
  document: string
  name: string
  subdomain: string
  occupationArea: number[]
  sharedModel: boolean | ''

  // address
  postal_code: string // cep
  street_type: string // tipo de logradouro
  street_address: string // endereco
  street_number: string // numero
  complement: string // complemento
  sublocality: string // bairro
  city: string // cidade
  state: string // UF

  // geolocation
  lat: number | '' // latitude
  lng: number | '' // longitude
  radius: number | '' // raio
  geolocation_at: string // data geolocalizacao
  geolocation_by_id: number | '' // id do usuario que fez a geolocalizacao
  geolocation_by_name: string // nome do usuario que fez a geolocalizacao

  allocated_users: number | ''
  responsibleAccount: IdName[]
  user_associated: AssociatedUser[]

  termsOfUse: Term[]
  privacyPolicy: Term[]

  licenses: ContractorLicenses

  forms: BodyInterface[]

  ppt_templates: PPTTemplates
}
