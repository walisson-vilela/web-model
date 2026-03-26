export interface FavoriteProps {
  closePopUp: () => void
  image_id: number
}

export interface StatusData {
  ids: number[]
  status: number
  reason_id: number
  notes: string
}

interface FileFavoriteItem {
  id: number
  contractor_id: number
  file_favorite_id: number
  file_id: number
  created_by: number
  created_at: string
  modified_by: number
  modified_at: string
  deleted: false
  deleted_by: null | number
  deleted_at: null | string
  recovered_by: null | number
  recovered_at: null | string
  people_id?: number | null
  role?: string | null
}
export interface DataProps {
  id: number
  name?: string
  description?: string
  shared?: boolean
  file_item_count?: number
  created_at?: string
  modified_at?: string
  approved?: number
  disapproved?: number
  file_favorite_items?: FileFavoriteItem[]
  file_favorite_permissions?: FileFavoriteItem[]
}

export interface LoginUserProps {
  id: number | null
  name: string | null
}
