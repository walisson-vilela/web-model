import {
  hierarchies,
  peoples,
  region,
} from '../../../../../../../../services/options'
import { strCmp } from '../../../../../../../../utils/Validators'

import Row from './Row'
import { getTeamsOptions } from './services'
import type { Config } from './types'

const Teams: Config = {
  label: 'Equipes',
  rightLabel: 'Equipes Associadas',
  loader: getTeamsOptions,
  search: (search, data) =>
    [data.id, data.name || '', data.role?.name || ''].some((str) =>
      strCmp(`${str}`, search, { contain: true }),
    ),
  emptyMessage: 'Nenhuma Equipe encontrada',
  filters: (user_id) => [
    {
      label: 'Pilar',
      name: 'hierarchy_id',
      options: async (value, page) => {
        return await hierarchies(value, page, 'mw-ui', true)
      },
      allowEmptySearch: true,
    },

    {
      label: 'Responsável',
      name: 'user_id',
      options: async (value, page) => {
        return await peoples(value, page, 'mw-ui', user_id)
      },
      allowEmptySearch: true,
    },

    {
      label: 'Área de Atuação',
      name: 'region_id',
      options: async (value, page) => {
        return await region(value, page, 'mw-ui')
      },
      allowEmptySearch: true,
    },
  ],
  RowComponent: Row,
}

export default Teams
