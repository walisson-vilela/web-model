import { ManagerProps } from '../interfaces'

export interface ExtManagerProps extends ManagerProps {
  hierarchy_id: number
}

export interface TabsProps {
  label: string
  hierarchy_id: number
}
