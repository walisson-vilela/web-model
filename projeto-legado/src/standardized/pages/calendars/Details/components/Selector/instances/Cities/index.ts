import { states } from '../../../../../../../../services/options'
import { strCmp } from '../../../../../../../../utils/Validators'

import Row from './Row'
import { getCities } from './services'
import type { Config } from './types'

const Cities: Config = {
  label: 'Cidades',
  rightLabel: 'Cidades Associadas',
  loader: getCities,
  search: (search, data) =>
    [
      data.id,
      data.name,
      data.state.name,
      data.state.short_name,
      data.country.name,
    ].some((str) => strCmp(`${str}`, search, { contain: true })),
  emptyMessage: 'Nenhuma Cidade encontrada',
  filters: () => [
    {
      label: 'Estado',
      name: 'state_id',
      options: async (value, page) => {
        return await states(value, page, 'mw-ui')
      },
    },
  ],
  RowComponent: Row,
}

export default Cities
