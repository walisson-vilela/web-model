import { FiltersInterfaces } from '@mw-kit/mw-manager'

import { profiles as profileOptions, epiType } from '../../../services/options'

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Perfil',
    name: 'profile_id',
    options: profileOptions,
    allowEmptySearch: true,
  },
  {
    label: 'Tipo de EPIs',
    name: 'epi_type_id',
    options: epiType,
    allowEmptySearch: true,
  },
  {
    label: 'Vencimento',
    name: 'expires_in',
    options: [
      { label: '30 dias', value: 30 },
      { label: '60 dias', value: 60 },
      { label: '+01 dia', value: 1 },
    ],
  },
]

export default filters
