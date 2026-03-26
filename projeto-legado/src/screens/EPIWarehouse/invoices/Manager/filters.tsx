import { FiltersInterfaces } from '@mw-kit/mw-manager'
import { epiType } from '../../../../services/options'

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Tipo de EPI',
    name: 'epi_type_id',
    options: epiType,
  },
]

export default filters
