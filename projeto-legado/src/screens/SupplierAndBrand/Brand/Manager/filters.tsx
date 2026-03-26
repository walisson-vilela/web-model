import { FiltersInterfaces } from '@mw-kit/mw-manager'

import Bullet from '../../../../components/Bullet'
import { keys } from '../../../../utils/Formatters'

import { status as statusLabels } from './label'

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Status',
    name: 'status',
    options: keys(statusLabels)
      .sort((a, b) => {
        if (statusLabels[a].name === statusLabels[b].name) return 0
        return statusLabels[a].name > statusLabels[b].name ? 1 : -1
      })
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
    label: 'Tipo',
    name: 'type',
    options: [
      { label: 'Própria', value: 'OWN' },
      { label: 'Concorrente', value: 'COMPETITOR' },
    ],
  },
]

export default filters
