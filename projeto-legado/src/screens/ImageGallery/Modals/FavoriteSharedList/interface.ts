import { ModalState } from '../../../../components/MwModal'
import { SetState } from '../../../interfaces'
import { DataInterface as DataInter } from '../../Home/tabs/Favorites/interfaces'

export interface FavoriteSharedListProps {
  setModal: SetState<ModalState>
  code: number | string
  item: DataInter
}

export interface DataInterface {
  id: number | string | null
  file_favorite_id: number | string | null
  role: string | null
  role_text: string | null
  people: {
    id: number | string | null
    name: string | null
    re: number | string | null
    people_id_name: string | null
  }
}

export interface BodyInterface {
  re: number | string | null
  name: string | null
  role_text: string | null
}
