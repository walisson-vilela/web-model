export interface DataInterface {
  id: number
  type: string | null
  created_by: number | null
  contractor_id: number | null
  emails: string | null
  params?: string | null
  created_at: string | null
  execution_start: string | null
  execution_pid: number | null
  execution_end: string | null
  link: string | null
  status: string | null
  execution_progress: number | string | null
  expires_at: number | string | null
  deleted: boolean
  deleted_at: string | null
  type_label: string | number | null
  email_list: {
    [key: string]: string | null
  }
  params_decoded: {
    abas: string | null
    supervisores: string | null
    situacao_loja: string | null
  }
  status_label: null
  user: {
    id: number
    people: {
      name: string | null
      decoded_json_fields: string | null
      decoded_json_extras: string | null
    }
    active_text: string | null
    type_text: string | null
  }
}

export interface BodyInterface {
  id: number | null
  name: string | null
  link: string | null
  user: {
    people: {
      name: string | null
    }
  }
  created_at: string | null
  execution_start: string | null
  status: string | JSX.Element
}
