import { FormTypes } from '../interfaces'

type StatusTypes = 'P' | 'E' | 'CE' | 'CS' | 'AA' | 'A' | 'R'

export interface DataInterface {
  id?: number | null
  contractor_id?: number | null
  type?: FormTypes | null
  type_label?: string | null
  emails?: string | null
  params?: {
    paths3?: string | null
    arquivo?: string | null
    hash?: string | null
    url?: string | null
    tpImportacaoRoteiro?: string | null
    sobrescreverRoteiro?: string | null
    abas?: string | null
    files?: {
      target?: {
        name?: string | null
        hash?: string | null
        directory?: string | null
        url?: string | null
      } | null
      log?: {
        name?: string | null
        hash?: string | null
        directory?: string | null
        url?: string | null
      } | null
    } | null
    'config [G]': { [key: string]: string | null } | null
    'config [F]': { [key: string]: string | null } | null
    'config [OP]': { [key: string]: string | null } | null
    'config [SC]': { [key: string]: string | null } | null
  } | null
  created_by?: number | null
  created_at?: string | null
  notbefore?: string | null
  fetched?: string | null
  completed?: string | null
  status?: StatusTypes | null
  status_label?: string | null
  status_by?: number | null
  status_at?: string | null
  people?: {
    id?: number | null
    name?: number | null
    decoded_json_fields?: string | null
    decoded_json_extras?: string | null
  } | null
  email_list?: {
    [key: string]: string | null
  }
}

export interface BodyInterface {
  id: number
  name: string
  import_date: string
  scheduled_date: string
  processed_date: string
  files: JSX.Element | string
  status: string | JSX.Element
}
