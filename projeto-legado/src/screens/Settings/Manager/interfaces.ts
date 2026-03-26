import { ManagerProps as BaseManagerProps } from '../../interfaces'

export interface ManagerProps extends BaseManagerProps {
  tab: 'web' | 'mobile'
}

export interface DataInterface {
  setting_id: number
  settings_decoded: unknown
  setting: {
    id: number
    name: string
    reference: {
      id: number
      name: string
    }
    reference_id: number
    type: 'web' | 'mobile'
    _labels: unknown
  }
}

export interface BodyInterface {
  id: number | null
  setting: string | null
  reference_id: number | null
  reference: string | null
  action: JSX.Element | string
}
