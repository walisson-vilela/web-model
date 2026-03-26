import { FiltersInterfaces } from '@mw-kit/mw-manager'

import { peoples as getSupervisorOptions } from '../../../../../../services/options'

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Supervisor',
    name: 'supervisor_id',
    options: getSupervisorOptions,
  },
]

export default filters
