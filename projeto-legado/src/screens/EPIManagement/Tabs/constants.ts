
import { ManagerProps } from '../../interfaces'
import * as Distribute from '../distribute'
import * as Manage from '../manage'

type GridComponent = (props: ManagerProps) => JSX.Element

export const tabOptions: {
  title?: string
  label: string
  grid: GridComponent
}[] = [
  {
    title: 'Utilize as opções abaixo para gerenciar a distribuição dos EPI\'s',
    label: 'Gerenciar',
    grid: Manage.Manager,
  },
  {
    title: 'Utilize as opções abaixo para realizar a distribuição de EPI\'s',
    label: 'Distribuir',
    grid: Distribute.Manager,
  },
]

export const tabs = ['manager', 'distribute']

export const BASE_PATH = '/main/epi/epi-management'
