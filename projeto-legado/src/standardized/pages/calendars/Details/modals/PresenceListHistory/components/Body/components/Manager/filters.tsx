import type { FiltersInterfaces } from '@mw-kit/mw-manager'

import { roles } from '../../../../../../../../../../services/options'

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Alerta de Monitoramento',
    name: 'alert_type',
    options: [
      {
        label: 'Fora do Raio',
        value: '',
      },
      {
        label: 'GPS Desligado',
        value: '',
      },
    ],
  },
  {
    label: 'Função',
    name: 'role_id',
    options: roles,
  },
  {
    label: 'Presença',
    name: 'presence',
    options: [
      {
        label: 'Sim',
        value: true,
      },
      {
        label: 'Não',
        value: false,
      },
    ],
  },
]

export default filters
