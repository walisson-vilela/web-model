import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'Canal',
    key: 'name',
    textAlign: 'left',
    width: 4,
    sortKey: 'name',
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
    width: 2,
    sortKey: 'duration_goal',
  },
  {
    content: 'PDVs',
    key: 'store_count_jsx',
    textAlign: 'center',
    width: 1,
    sortKey: 'store_count',
  },
  {
    content: '% PDVs Dentro da Meta',
    key: 'store_percentage_txt',
    textAlign: 'center',
    width: 3,
    sortKey: 'store_percentage',
  },
  {
    content: 'Particularidades',
    key: 'particularities_jsx',
    textAlign: 'center',
    width: 3,
    sortKey: 'particularities',
  },
]

export default header
