import { Filter } from '@mw-kit/mw-ui/types'

export interface RelationProps {
  id: number | null
  contractor_id: number | null
  name: string | null
  products_step: number | null
  require_store: boolean | null
  default: number | null
  display?: string
  first_attendance?: string
  complete_filling_only?: string | boolean
  first_attendance_percentage?: number
  confirmWarnign?: boolean
}

export interface TabProps {
  config: {
    label: string
    relationTitle: string
    associateTitle: string
    endPoint: string
    filters: Filter[]
    row_id?: number
  }
  edit?: boolean
}

export interface PopupSettingsProps extends TabProps {
  id: string | number
}

export interface PopupSettingsContentProps extends PopupSettingsProps {
  setSettingOpened: React.Dispatch<React.SetStateAction<boolean>>
}

export interface PopupFormI {
  display: 'N' | 'S'
  first_attendance: 'N' | 'S'
  complete_filling_only: 'N' | 'S'
  first_attendance_percentage: number
  confirmWarnign: boolean
}
