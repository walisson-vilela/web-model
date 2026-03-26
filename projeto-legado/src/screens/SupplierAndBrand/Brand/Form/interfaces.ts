import { Rule } from '../../../../components/GridSelector/interfaces'
import { Modifier } from '../../../../standardized/components/form/components/Footer'

export interface Countries {
  id: number | null
  country_id: number
  name: string
  occupation: 'NATIONAL' | 'REGIONAL'
  states_rule: Rule
  cities_rule: Rule
  segments_rule: Rule
  market_flags_rule: Rule
  states: States[]
  cities: Cities[]
  segments: Segments[]
  market_flags: MarketFlags[]
}

interface States {
  id?: number
  foreign_id: number
  name: string
  name_short: string
}

interface Cities {
  id?: number
  foreign_id: number
  name: string
  state: Omit<States, 'id' | 'foreign_id'>
}

interface Segments {
  id?: number
  foreign_id: number
  name: string
}

interface MarketFlags {
  id?: number
  foreign_id: number
  name: string
  network: Network
}

interface Network {
  name: string
  group: Group
}

interface Group {
  name: string
}

export interface Data {
  id: number
  code: string | null
  name: string
  type: 'OWN' | 'COMPETITOR'
  status: boolean
  products_count: number

  classification: {
    id: number
    name: string
  } | null

  countries: Countries[]

  file: {
    id: number
    url: string
    extension: string
  } | null

  supplier: {
    id: number
  } | null

  modifier: Modifier | null
}

export interface Form {
  status: boolean
  file: string
  type: 'OWN' | 'COMPETITOR'
  supplier_id: number | ''
  code: string
  name: string
  classification_id: number | ''
  countries: Countries[]
}
