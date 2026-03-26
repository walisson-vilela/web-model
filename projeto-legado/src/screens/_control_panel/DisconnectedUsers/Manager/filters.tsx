import { FiltersInterfaces } from '@mw-kit/mw-manager'

import { roles as getRolesOptions } from '../../../../services/options'

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Função',
    name: 'role_id',
    options: getRolesOptions,
  },
  {
    label: 'Atendimento Iniciado',
    name: 'attendance_started',
    options: [
      { label: 'Sim', value: 'Sim' },
      { label: 'Não', value: 'Não' },
    ],
  },
  {
    label: 'Classificação',
    name: 'desconected_classification',
    options: [
      { label: '2 horas', value: '2 horas' },
      { label: '4 horas', value: '4 horas' },
      { label: '+1 dia', value: '+1 dia' },
    ],
  },
]

export default filters
