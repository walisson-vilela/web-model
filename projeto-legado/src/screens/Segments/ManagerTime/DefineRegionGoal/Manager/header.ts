import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'Área de Atuação',
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
    width: 3,
    sortKey: 'duration_goal',
  },
  {
    content: 'PDVs',
    key: 'store_count_jsx',
    textAlign: 'center',
    width: 3,
    sortKey: 'store_count',
  },
  {
    content: '% Dentro da Meta',
    key: 'store_percentage_jsx',
    textAlign: 'center',
    width: 3,
    sortKey: 'store_percentage',
  },
]

export default header
