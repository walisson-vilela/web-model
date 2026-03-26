import {
  cities,
  hierarchies,
  region,
  states,
  teams,
} from '../../../../../../../../services/options'
import { strCmp } from '../../../../../../../../utils/Validators'

import Row from './Row'
import { getUsersOptions } from './services'
import type { Config } from './types'

const Users: Config = {
  label: 'Usuários',
  rightLabel: 'Usuários Associados',
  loader: getUsersOptions,
  search: (search, data) =>
    [data.id, data.person.registration, data.name, data.role.name].some((str) =>
      strCmp(`${str}`, search, { contain: true }),
    ),
  emptyMessage: 'Nenhum Usuário encontrado',
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
      label: 'Equipe',
      name: 'hierarchy_element_id',
      options: async (value, page) => {
        return await teams(value, page, 'mw-ui', undefined, user_id)
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
    {
      label: 'Estado',
      name: 'state_id',
      options: async (value, page) => {
        return await states(value, page, 'mw-ui')
      },
    },
    {
      label: 'Cidade',
      name: 'city_id',
      options: async (value, page) => {
        return await cities(value, page, 'mw-ui')
      },
    },
  ],
  RowComponent: Row,
}

export default Users
