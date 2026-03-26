import { FiltersInterfaces } from '@mw-kit/mw-manager'

import Bullet from '../../../../components/Bullet'
import { scenarios as getScenariosOptions } from '../../../../services/options'

import { status as statusLabels } from './labels'

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Status',
    name: 'active',
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
    label: 'Cenário',
    name: 'scenery_id',
    options: getScenariosOptions,
  },
  {
    label: 'Tipo',
    name: 'default',
    options: [
      { label: 'Padrão', value: 1 },
      { label: 'Personalizado', value: 0 },
    ],
  },
  {
    label: 'Comportamento',
    name: 'temporary',
    options: [
      { label: 'Definitivo', value: 0 },
      { label: 'Sem Comportamento', value: -1 },
      { label: 'Temporário', value: 1 },
    ],
  },
]

export default filters
