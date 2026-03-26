import { Filter } from '@mw-kit/mw-ui/types'

export interface RelationProps {
  id: number | null
  name: string | null
  parent_label?: string | null
  product_line?: {
    fullpath_label: string | null
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
  hasProductLine?: boolean
  hasParentLabel?: boolean
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
