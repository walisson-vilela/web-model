import { RouteTab } from '../../../../routes/types'
import { ManagerProps } from '../../../../screens/interfaces'
import * as Contractors from '../contractors'
import * as Groups from '../groups'

export const tabOptions: {
  label: string
  grid: (props: ManagerProps) => JSX.Element
  form: RouteTab<{
    id?: string
  }>
}[] = [
  {
    label: 'Conta',
    grid: Contractors.Manager,
    form: Contractors.Form,
  },
  {
    label: 'Agrupamento',
    grid: Groups.Manager,
    form: Groups.Form,
  },
]

export const tabs = ['', 'groups']

export const BASE_PATH = '/main/accounts/contractors'
