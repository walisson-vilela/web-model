import { ModalState } from '../../../../components/MwModal'
import { SetState } from '../../../interfaces'
import { FormStateInterface } from '../../Form/interfaces'

export interface SelectedInterface {
  [key: string]: {
    [key: string]: string | number
  }
}

export interface SettingProps {
  setModal: SetState<ModalState>
  setForm: SetState<FormStateInterface>
  selected?: SelectedInterface
}

export interface OptionsListInterface {
  label: string
  value: string
  subLabel?: string
  subValue?: string
  subOptions?: {
    label: string
    value: string | number
  }[]
}
