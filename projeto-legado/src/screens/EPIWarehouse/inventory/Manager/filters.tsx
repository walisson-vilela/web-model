import { FiltersInterfaces } from '@mw-kit/mw-manager'

import Bullet from '../../../../components/Bullet'
import { epiType } from '../../../../services/options'

import { status as statusLabels } from './labels'

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Status',
    name: 'status',
    options: Object.keys(statusLabels)
      .reverse()
      .map((key) => {
        const { name, color } = statusLabels[key]

        const option: FiltersInterfaces.Option = {
          label: <Bullet content={name} color={color} />,
          value: key,
        }

        return option
      }),
  },
  {
    label: 'Tipo de EPI',
    name: 'epi_type_id',
    options: epiType,
  },

  {
    label: 'Período de Reposição',
    name: 'epi_expiration_months',
    options: [
      { label: 'Até 3 meses', value: 3 },
      { label: 'Até 6 meses', value: 6 },
      { label: '12 meses', value: 12 },
      { label: '18 meses', value: 18 },
      { label: '24 meses', value: 24 },
    ],
  },
]

export default filters
