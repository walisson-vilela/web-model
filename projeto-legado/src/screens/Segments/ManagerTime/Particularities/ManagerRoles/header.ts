import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'Função',
    key: 'name',
    textAlign: 'left',
    width: 8,
    sortKey: 'name',
  },
  {
    content: 'Tempo Médio',
    key: 'duration_average_txt',
    textAlign: 'center',
    width: 4,
    sortKey: 'duration_average',
  },
  {
    content: 'Meta',
    key: 'duration_goal_txt',
    textAlign: 'center',
    width: 4,
    sortKey: 'duration_goal',
  },
]

export default header
