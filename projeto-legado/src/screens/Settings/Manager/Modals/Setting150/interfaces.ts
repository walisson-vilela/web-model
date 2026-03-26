export interface DataInterface {
  id?: number | null
  contractor_id?: number | null
  setting_id?: number | null
  created_by?: number | null
  created_at?: string | null
  modified_by?: number | null
  modified_at?: string | null
  deleted?: boolean | null
  deleted_by?: number | null
  deleted_at?: string | null
  recovered_by?: number | null
  recovered_at?: string | null
  settings_decoded: {
    enabled?: 0 | 1 | null
    action?: 1 | 2 | 3 | null
    _labels?: {
      enabled?: string | null
      action?: string | null
    }
  }
  setting?: {
    id?: number | null
    name?: string | null
    reference?: string | null
    type?: string | null
    _labels: {
      enabled: { [key: string | number]: string }
      action: { [key: string | number]: string }
    }
  }
}

export interface BodyInterface {
  enabled: 0 | 1
  action?: 1 | 2 | 3
}
