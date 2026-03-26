export interface DataInterface {
  id: number
  status: string
  name: string
  hierarchy_name: string
  hierarchy_id: number
  account_name: string
  action: string
  has_forms: number
  has_regions: number
  has_segments: number | null
  has_stores: number
  has_products: number
  has_peoples: number
  validity: string
  delivered: number
  stores_conflicts_count: number
  products_conflicts_count: number
  peoples_conflicts_count: number

  action_icon: {
    icon: string
    color: string
  }
}

export interface BodyInterface {
  id: number
  status: string
  name: string
  name_jsx: JSX.Element | null
  account_name: string
  hierarchy_name: string
  hierarchy_id: number
  delivered: JSX.Element
  has_forms: JSX.Element
  has_regions: JSX.Element
  has_segments: JSX.Element
  has_stores: JSX.Element
  has_products: JSX.Element
  has_peoples: JSX.Element
  validity: string
  config: JSX.Element
}
