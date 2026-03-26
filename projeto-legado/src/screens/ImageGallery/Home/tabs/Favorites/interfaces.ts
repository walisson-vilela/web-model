import { ModalState } from '../../../../../components/MwModal'
import { SetState } from '../../../../interfaces'

interface FileFavoritesPermissions {
  id?: number | null
  contractor_id?: number | null
  file_favorite_id?: number | null
  people_id?: number | null
  role?: string | null
  created_by?: number | null
  created_at?: string | null
  modified_by?: number | null
  modified_at?: string | null
  deleted?: boolean | null
  deleted_by?: number | null
  deleted_at?: string | null
  recovered_by?: number | null
  recovered_at?: string | null
  people: {
    id?: number | null
    name?: string | null
    decoded_json_fields?: any
    decoded_json_extras?: any
    people_id_name?: string | null
  }
}

export type Permissions = {
  people_id: number
  people_name: string
  role: string
  role_jsx?: JSX.Element
}

export interface ParserProps {
  data: DataInterface[]
  setModal: SetState<ModalState>
}

export interface DataInterface {
  id?: number | null
  name?: string | null
  description?: string | null
  shared?: boolean | null
  file_count?: number | null
  created_at?: string | null
  modified_at?: string | null
  approved?: number | null
  disapproved?: number | null
  file_favorite_permissions?: FileFavoritesPermissions[] | null
  file_ids: number[] | null
}

export interface BodyInterface {
  favorite_id: number | null
  favorite_name: string | null
  favorite_name_jsx: string | JSX.Element | null
  people_name: string | null
  share_type: string | null
  share_type_label: string | JSX.Element | null
  image_count: number | string | null
  approved_image_count: number | string | null
  disapproved_image_count: number | string | null
  permissions: Permissions[]
  file_ids: number[] | null
}
