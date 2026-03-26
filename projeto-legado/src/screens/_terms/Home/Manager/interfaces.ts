import { ManagerProps } from '../../../interfaces'

export interface CurrentDataInterface {
  id: number
  contractor_id: number | null
  active: string | null
  title: string | null
  created_at: string | null
  modified_at: string | null
  accepted_count: string | null
  Account: {
    id: string | null
    name: string | null
  }
  percentage: string | null
  validity_at: string | null
}

export interface CurrentBodyInterface {
  id: number
  contractor_id: number | null
  title: string
  account_name: string
  created_at: string
  accepted_count: string
  percentage: string
  validity_at: string | null
}

export interface ExpiredDataInterface {
  id: number | null
  contractor_id: number | null
  active: string | null
  title: string | null
  created_at: string | null
  modified_at: string | null
  accepted_count: string | null
  Account: {
    id: string | null
    name: string | null
  }
  percentage: string | null
  validity_at: string | null
}

export interface ExpiredBodyInterface {
  id: number
  contractor_id: number
  title: string
  validity_at: string | null
  accepted_count: string | null
  account_name: string
  percentage: string | null
  created_at: string | null
}

export interface ComponentProps extends ManagerProps {
  tabId: number
}

export type PrivacyPolicityProps = {
  id: number
  accountName: string
  createdAt: string
}

export type UserListProps = {
  id: number
  accountName: string
  title: string
  created_at: string
}
