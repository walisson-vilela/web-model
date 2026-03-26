export interface BodyInterface {
  id: number
  status: boolean
  status_jsx: JSX.Element
  code: string | null
  name: string
  supplier: JSX.Element | null
  type: string
  type_label: string | null

  country_count: number
  country_count_jsx: string | null

  product_count: number
  products_count_jsx: JSX.Element | null
}
