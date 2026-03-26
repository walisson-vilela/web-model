import { ManagerProps } from '../interfaces'

import MwBrand from './Brand/Manager'
import MwSupplier from './Supplier'

const tabs: {
  label: string
  component: React.FunctionComponent<ManagerProps>
}[] = [
  {
    label: 'Fabricantes',
    component: MwSupplier,
  },
  {
    label: 'Marcas',
    component: MwBrand,
  },
]

export const paths = ['', 'brands']

export default tabs
