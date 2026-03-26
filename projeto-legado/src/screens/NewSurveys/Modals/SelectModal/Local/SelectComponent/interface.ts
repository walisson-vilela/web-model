import { Filter } from '@mw-kit/mw-ui/types'

export interface RelationProps {
  id: number | null
  country_name?: string | null
  name: string | null
  name_short?: string | null
  abbreviation?: string | null
  country?: {
    id: number | null
    name: string | null
    name_short: string | null
  }
  state?: {
    id: number | null
    name: string | null
  }
  city?: {
    id: number | null
    name: string | null
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
  hasShortName?: boolean
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
