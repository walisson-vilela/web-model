import { ModalState } from '../../../../components/MwModal'
import { SetState } from '../../../interfaces'

export interface DownloadIMGProps {
  ids: number[]
  setModal: SetState<ModalState>
  reload?: () => void
  numberOfImages: number
}

export interface PayloadData {
  type: string
  options: {
    ids: Number[]
    options: {
      type_cover: string
      quality?: string
      grouping?: string
    }
  }
}
