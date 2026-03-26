import { Filter } from '@mw-kit/mw-ui/types'

export interface RelationProps {
  id: number | null
  name: string | null
  formatted_address?: string | null
  document?: string | null
  classification?: {
    name?: string | null
  }
  link_type: string | null
}

export interface TabProps {
  config: {
    label: string
    relationTitle: string
    associateTitle: string
    endPoint: string
    filters: Filter[]
    emptyMessage: string
    linkType: string
    row_id?: number
  }
  hasDetails?: boolean
}

export interface TabConfigProps {
  [key: string]: {
    label: string
    relationTitle: string
    associateTitle: string
    endPoint: string
    filters: Filter[]
    emptyMessage: string
    linkType: string
    row_id?: number
  }
}
