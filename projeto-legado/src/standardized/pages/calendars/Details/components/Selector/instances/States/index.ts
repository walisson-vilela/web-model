import { strCmp } from '../../../../../../../../utils/Validators'

import Row from './Row'
import { getStates } from './services'
import type { Config } from './types'

const States: Config = {
  label: 'Estados',
  rightLabel: 'Estados Associados',
  loader: getStates,
  search: (search, data) =>
    [data.id, data.name, data.country.name, data.short_name].some((str) =>
      strCmp(`${str}`, search, { contain: true }),
    ),
  emptyMessage: 'Nenhum Estado encontrado',
  filters: () => [],
  RowComponent: Row,
}

export default States
