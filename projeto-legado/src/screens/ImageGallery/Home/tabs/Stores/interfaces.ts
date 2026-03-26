export interface DataInterface {
  store?: {
    id?: number | null
    name?: string | null
    status?: number | null
  }
  brands?:
    | {
        id?: number | null
        name?: string | null
        avatar?: string | null
      }[]
    | null
  brand_count?: number | null
  image_count?: number | null
  approved_image_count?: number | null
  disapproved_image_count?: number | null
  file_ids: number[] | null
}

export interface BodyInterface {
  store_id: number | null
  store_name: string | null
  store_name_jsx: string | JSX.Element | null
  brands: {
    name: string
    avatar: string
  }[]
  image_count: number | string | null
  approved_image_count: number | string | null
  disapproved_image_count: number | string | null
  file_ids: number[] | null
  brand_count_jsx: string | JSX.Element | null
}
