export interface Planogram {
  id: number
  title: string
  comment: string
  file: File
}

interface File {
  url: string
  name: string
}
export interface BodyInterface {
  id: number
  active: boolean
  active_jsx: JSX.Element | null
  name: string
  classification_label: string
  contractor_id: string
  has_product: number | null
  leaf_count: number | null
  level: number
  level_label: string
  lft: number
  parent_id: number | null
  parent_label: string | null
  planograms: Planogram[]
  product_count: number
  product_count_jsx: JSX.Element | number | null
  rght: number
  root_label: string
  status: boolean
  status_label: string
}
