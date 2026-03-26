import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'PDV',
    key: 'name',
    textAlign: 'left',
    width: 5,
    sortKey: 'name',
  },
  {
    content: 'Endereço',
    key: 'formatted_address',
    textAlign: 'left',
    width: 5,
    sortKey: 'formatted_address',
  },
  {
    content: 'Tempo Médio',
    key: 'duration_average_txt',
    textAlign: 'center',
    width: 3,
    sortKey: 'duration_average',
  },
  {
    content: 'Meta',
    key: 'duration_goal_jsx',
    textAlign: 'center',
    width: 3,
    sortKey: 'duration_goal',
  },
]

export default header
