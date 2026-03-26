import { ButtonProps } from 'semantic-ui-react'

export interface DataInterface {
  id?: number | null
  scenery_id?: number | null
  scenery_label?: string | null
  classification_action_id?: boolean | null
  name?: string | null
  active?: boolean | null
  temporary?: boolean | null
  default?: boolean | null
  action?: {
    id?: number | null
    name?: string | null
  }
  scenery?: {
    id?: number | null
    name?: string | null
    action?: boolean | null
    temporary?: boolean | null
    origin?: string | null
    can_upload_file?: boolean | null
  }
  active_label?: string | null
  temporary_label?: string | null
  default_label?: string | null
  required_file?: boolean | null
  dependency_count?: number | null
  future_dependency_count?: number | null
}

export interface BodyInterface {
  id: number
  active: boolean
  active_jsx: JSX.Element
  scenery_id: number
  scenery_label: string
  scenery_temporary: boolean
  can_upload_file: boolean
  name: string
  action_id: boolean
  temporary: boolean
  temporary_label: string
  default: boolean
  default_label: string
  required_file: boolean
  dependency_count: number
  future_dependency_count: number
}

export interface OpenedModal {
  title: JSX.Element | string | JSX.Element[] | string[]
  content: JSX.Element | string | JSX.Element[] | string[]
  actions: ButtonProps[]
}
