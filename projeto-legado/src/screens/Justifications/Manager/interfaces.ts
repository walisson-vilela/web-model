import { ButtonProps } from 'semantic-ui-react'

export interface DataInterface {
  id: number
  created_at: string | null
  start: string | null
  end: string | null
  impact_days: number | null
  impact_stores: number | null
  impact_attendances: number | null
  audit_due_date: string | null
  audit: {
    id: string | null
    status: string | null
    obs: string | null
    created_at: string | null
    created_by: number | null
    creator: {
      id: number | null
      name: string | null
      decoded_json_fields: string | null
      decoded_json_extras: string | null
      people_id_name: string | null
    }
    status_label: string | null
  }
  file?: {
    url?: string
    id: number | null
    hash: string | null
  }
  justify_type: {
    name: string
  }
  people: {
    name: string | null
    user: {
      active: number
    }
  }
  audit_due_days: number
}

export interface BodyInterface {
  id: number
  created_at: string | null
  start: string | null
  end: string | null
  impact_days: number
  impact_stores: number
  impact_attendances: number
  justify_type: string | null
  fileUrl: string | null
  fileHash: string | null
  fileId: number | null
  userActive: number
  userName: string
  file_jsx: JSX.Element | string | null
  people_jsx: JSX.Element | string | null
  period_jsx: JSX.Element | string | null
  impact_jsx: JSX.Element | string | null
  action: number
  action_jsx: JSX.Element | string | null
  status_label: string
  reproveAuthor?: string
  reprovedMessage?: string
}

export interface OpenedModal {
  title: JSX.Element | string | JSX.Element[] | string[]
  content: JSX.Element | string | JSX.Element[] | string[]
  actions: ButtonProps[]
}
