import { Filter } from '@mw-kit/mw-ui/types'

export interface RelationProps {
  id: number | null
  name: string | null
  role?: {
    id: number | null
    name: string | null
    master: boolean | null
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
  hasDescription?: boolean
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
