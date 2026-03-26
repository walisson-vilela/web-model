import { RouteTab } from '../../../routes/types'
import { ManagerProps } from '../../../screens/interfaces'
import * as Inventory from '../inventory'
import * as Invoices from '../invoices'

export const tabOptions: {
  title?: string,
  label: string
  grid: (props: ManagerProps) => JSX.Element
  form: RouteTab<{
    id?: string
  }>
}[] = [
  {
    title: 'notas fiscais',
    label: 'Nota Fiscal',
    grid: Invoices.Manager,
    form: Invoices.Form,
  },
  {
    title: 'seu estoque',
    label: 'Controle de Estoque',
    grid: Inventory.Manager,
    form: Inventory.Form,
  },
]

export const tabs = ['invoices', 'inventory']

export const BASE_PATH = '/main/epi/epi-warehouse'
