import { Filter } from '@mw-kit/mw-ui/types'

export interface RelationProps {
  id: number | null
  name: string | null
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
