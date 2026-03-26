export interface DataInterface {
  id?: number | null
  contractor_id?: number | null
  name?: string | null
  status?: string | null
  parent_id?: number | null
  lft?: number | null
  rght?: number | null
  level?: number | null
  distribution_center_categories?:
    | {
        category_id?: number | null
        distribution_center_id?: number | null
      }[]
    | null
}

export interface BodyInterface {
  id: number | null
  name: string | null
  included_jsx: JSX.Element | null
}
