import { FiltersInterfaces } from '@mw-kit/mw-manager'

import { peoples as getSupervisorOptions } from '../../../../../../services/options'

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Supervisor',
    name: 'supervisor_id',
    options: getSupervisorOptions,
    allowEmptySearch: true,
  } as unknown as FiltersInterfaces.Filter,
  {
    label: 'Qtde. de Ocorrências',
    name: 'occurrences_count',
    options: [
      { label: 'Até 3', value: 'lte3' },
      { label: 'Mais que 3', value: 'gt3' },
    ],
  },
]

export default filters
