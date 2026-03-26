import { ModalState } from '../../../../components/MwModal'

export type Props = {
  setModal: React.Dispatch<React.SetStateAction<ModalState>>
}

export type SettingComponent = React.VoidFunctionComponent<Props>

export type SettingIds = Exclude<
  120 | 121 | 130 | 140 | 150 | 160 | 180 | 190 | 210 | 250 | 280,
  121 | 140 | 160 | 180
>

export type Settings = { [key in SettingIds]: SettingComponent }
