import { SortState } from '@mw-kit/mw-manager'

import { ModalState } from '../../../../../components/MwModal'

export interface UserInterface {
  id: number | null
  name: string | null
  role: string | null
}

export type Types = ['document', 'people_id', 're']
export type Type = Types[number]

export type PendenciesInterface = {
  [key in Type]: UserInterface[]
}

export interface BodyInterface {
  id: number
  name: string
  role: string
}

export interface FormInterface {
  type: string
  date: string
}

export interface WrapperProps {
  isActive: boolean
}

export interface ContentProps {
  form: FormInterface
  currentType: Type
  currentSchedule: FormInterface | null
  type: Type
  setForm: (value: React.SetStateAction<FormInterface>) => void
  item: any
  modalRef: React.MutableRefObject<any>
  setOpenedMenu: (value: React.SetStateAction<boolean>) => void
  openedMenu: boolean
  closeMenu: () => void
  loading: { [key: string]: boolean }
  setLoading: React.Dispatch<
    React.SetStateAction<{
      [key: string]: boolean
    }>
  >
}

export interface CalendarProps {
  form: FormInterface
  setForm: (value: React.SetStateAction<FormInterface>) => void
  disabled: boolean
}

export interface OpenModalConfirmationProps {
  currentSchedule: FormInterface | null
  currentType: Type
  form: FormInterface
  setOpenNotification: (value: React.SetStateAction<JSX.Element>) => void
  setModal: (value: React.SetStateAction<ModalState>) => void
}

export interface getSettingInterface {
  pendence: string
  extract?: boolean
  sort?: SortState | null
}

export interface postSettingInterface {
  type: string
  due_date: string
}

export interface Props {
  loading: {
    [key: string]: boolean
  }

  setLoading: React.Dispatch<
    React.SetStateAction<{
      [key: string]: boolean
    }>
  >

  pendance: string
}
