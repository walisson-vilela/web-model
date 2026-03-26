export interface BodyInterface {
  id: number
  contractor_id?: number

  status: boolean
  status_jsx: string | JSX.Element | boolean | null
  code: string | null
  name: string
  brand_count: number
  brands_count_jsx: JSX.Element | number | null
  brand_percentage: number
  brand_percentage_jsx: string | JSX.Element | null
  product_count: number
  product_count_jsx: JSX.Element | number | null
}
