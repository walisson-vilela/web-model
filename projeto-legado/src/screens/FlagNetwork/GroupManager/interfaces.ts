import { ButtonProps } from 'semantic-ui-react'

export interface DataInterface {
  id?: number | null
  contractor_id?: number | null
  parent_id?: number | null
  rght?: number | null
  lft?: number | null
  name?: string | null
  parent_name?: string | null
  level?: string | null
  active?: boolean | null
  store_count?: number | null
  store_percentage?: number | null
  first_child_count?: number | null
  total_child_count?: number | null
  next_child_count?: number | null
  created_by?: number | null
  created_at?: string | null
  modified_by?: number | null
  modified_at?: string | null
  deleted?: boolean | null
  deleted_by?: number | null
  deleted_at?: string | null
  recovered_by?: number | null
  recovered_at?: string | null
  avatar?: {
    id?: number | null
    url?: string | null
  } | null
  networks?: DataInterface[]
  flags?: DataInterface[]
}

export interface BodyInterface {
  id: number | null
  active: boolean | null
  active_jsx: JSX.Element | null
  name: string | null
  network_count_value: number | null
  network_count: JSX.Element | null
  flag_count_value: number | null
  flag_count: JSX.Element | null
  store_count_value: number | null
  store_count: JSX.Element | null
}

export interface OpenedModal {
  title: JSX.Element | string | JSX.Element[] | string[]
  content: JSX.Element | string | JSX.Element[] | string[]
  actions: ButtonProps[]
}
