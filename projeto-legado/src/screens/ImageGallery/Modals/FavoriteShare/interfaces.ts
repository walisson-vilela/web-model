import { ModalState } from '../../../../components/MwModal'
import { SetState } from '../../../interfaces'
import { BodyInterface } from '../../Home/tabs/Favorites/interfaces'

export interface FavoriteShareProps {
  setModal: SetState<ModalState>
  reload: () => void
  item: BodyInterface
}
