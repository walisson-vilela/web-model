import { Form } from './interfaces'

interface Label {
  label: string | JSX.Element | (string | JSX.Element)[]
  placeholder?: string
  required?: boolean
}

const labels: {
  [key in keyof Omit<
    Form,
    | 'id'
    | 'status'
    | 'source_status'
    | 'source_address'
    | 'address_lat'
    | 'address_lng'
    | 'lat'
    | 'lng'
    | 'radius'
    | 'geolocation_tolerance'
    | 'geolocation_status'
    | 'geolocation_at'
    | 'geolocation_by_id'
    | 'geolocation_by_name'
    | 'manager_contact'
    | 'person_in_charge_1_contact'
    | 'person_in_charge_2_contact'
  >]: Label
} = {
  // initial data
  code: {
    label: 'Código do PDV',
    placeholder: 'Código Cadastral',
  },
  nickname: {
    label: 'Nome de Identificação',
    placeholder: 'Exemplo: Supermercado BH - Norte LJ 75',
    required: true,
  },
  segment: {
    label: 'Canal de Vendas',
    placeholder: 'Selecione',
    required: true,
  },
  market_flag: {
    label: 'Bandeira',
    placeholder: 'Selecione',
  },
  typology: {
    label: 'Tipologia',
    placeholder: 'Selecione',
  },
  classification: {
    label: 'Classificação',
    placeholder: 'Selecione',
  },
  checkout: {
    label: 'Número de Checkouts',
    placeholder: 'Selecione',
  },

  // complement data
  document: {
    label: 'CNPJ',
    placeholder: '00.000.000/0000-00',
  },
  fantasy_name: {
    label: 'Nome Fantasia ',
    placeholder: 'Exemplo: Supermercado BH Loja 75',
  },
  company_name: {
    label: 'Razão Social ',
    placeholder: 'Exemplo: Supermercado BH Ltda',
  },
  situation_name: {
    label: 'Situação Cadastral (RF) ',
    placeholder: 'Selecione',
  },

  // address
  postal_code: {
    label: 'CEP',
    placeholder: '00000-000',
    required: true,
  },
  street_type: {
    label: 'Tipo de Logradouro',
    placeholder: 'Selecione',
    required: true,
  },
  street_address: {
    label: 'Endereço',
    placeholder: 'Endereço',
    required: true,
  },
  street_number: {
    label: 'Número',
    placeholder: 'Nº',
    required: true,
  },
  complement: {
    label: 'Complemento',
    placeholder: 'Ex: Casa B',
  },
  sublocality: {
    label: 'Bairro',
    placeholder: 'Bairro',
    required: true,
  },
  city: {
    label: 'Cidade',
    placeholder: 'Cidade',
    required: true,
  },
  state: {
    label: 'UF',
    placeholder: 'UF',
    required: true,
  },

  // contact
  phone: {
    label: 'PDV',
  },
  email: {
    label: 'E-mail',
  },
}

export default labels
