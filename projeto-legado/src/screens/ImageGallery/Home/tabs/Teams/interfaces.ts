export interface DataInterface {
  people?: {
    id?: number | null
    re?: number | null
    name?: string | null
    status?: number | null
  }
  role?: {
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
  people_id: number | null
  people_re: number | null
  people_name: string | null
  people_name_jsx: string | JSX.Element | null
  role_name: string | null
  brand_count_jsx: string | JSX.Element | null
  brands: {
    name: string
    avatar: string
  }[]
  image_count: number | string | null
  approved_image_count: number | string | null
  disapproved_image_count: number | string | null
  file_ids: number[] | null
}
