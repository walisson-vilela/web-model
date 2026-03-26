export interface DataInterface {
  category?: {
    id?: number | null
    name?: string | null
  }
  contractor?: {
    name?: string | null
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
  category_id: number | null
  category_name: string | null
  contractor_name: string | null
  brands: {
    name: string
    avatar: string
  }[]
  brand_count_jsx: string | JSX.Element | null
  image_count: number | string | null
  approved_image_count: number | string | null
  disapproved_image_count: number | string | null
  file_ids: number[] | null
}
