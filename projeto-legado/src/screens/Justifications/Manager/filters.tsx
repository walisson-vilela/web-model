import { FiltersInterfaces } from '@mw-kit/mw-manager'

import { historic, justifies } from '../../../services/options'

const justifyFilters: FiltersInterfaces.Filter[] = [
  {
    label: 'Anexo',
    name: 'has_file',
    options: [
      { label: 'Sim', value: 1 },
      { label: 'Não', value: 0 },
    ],
  },

  {
    label: 'Justificativa',
    name: 'justify_type_id',
    options: justifies,
  },
]

const historyFilters: FiltersInterfaces.Filter[] = [
  {
    label: 'Status',
    name: 'audit_status',
    options: [
      { label: 'Aprovado', value: 'Aprovado' },
      { label: 'Reprovado', value: 'Reprovado' },
      { label: 'Expirado', value: 'Expirado' },
    ],
  },

  {
    label: 'Anexo',
    name: 'has_file',
    options: [
      { label: 'Sim', value: 1 },
      { label: 'Não', value: 0 },
    ],
  },

  {
    label: 'Justificativa',
    name: 'justify_type_id',
    options: historic,
  },
  {
    label: 'Observação',
    name: 'audit_has_obs',
    options: [
      { label: 'Sim', value: 1 },
      { label: 'Não', value: 0 },
    ],
  },
]

export { justifyFilters, historyFilters }
