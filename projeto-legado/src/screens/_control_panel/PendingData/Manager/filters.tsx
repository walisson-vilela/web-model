import { FiltersInterfaces } from '@mw-kit/mw-manager'

import { roles as getRolesOptions } from '../../../../services/options'

import { connectionLevel as connectionLevelLabels } from './labels'

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Função',
    name: 'role_id',
    options: getRolesOptions,
  },
  {
    label: 'Tipo de Conexão',
    name: 'connection_type',
    options: [
      {
        label: 'Wifi',
        value: 1,
      },
      {
        label: 'Rede Móvel',
        value: 1,
      },
    ],
  },
  {
    label: 'Nível de Conexão',
    name: 'connection_level_status',
    options: Object.keys(connectionLevelLabels)
      .sort((a: string, b: string): 1 | 0 | -1 => {
        const aName = connectionLevelLabels[a].name.toLowerCase()
        const bName = connectionLevelLabels[b].name.toLowerCase()

        if (aName < bName) return -1
        else if (aName > bName) return 1
        else return 0
      })
      .map((key) => {
        const { name } = { ...connectionLevelLabels[key] }

        const option: FiltersInterfaces.Option = {
          label: name,
          value: name,
        }

        return option
      }),
  },
]

export default filters
