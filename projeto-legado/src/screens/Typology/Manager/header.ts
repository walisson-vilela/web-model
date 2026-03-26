import { ColumnInterface } from '@mw-kit/mw-manager'

const width = screen.width
const header: ColumnInterface[] = [
  {
    content: 'Status',
    key: 'active_jsx',
    textAlign: 'left',
    width: width > 1360 ? 1 : 2,
    sortKey: 'active',
  },
  {
    content: 'Tipologia',
    key: 'name',
    textAlign: 'left',
    width: width > 1360 ? 9 : 8,
    sortKey: 'name',
  },
  {
    content: 'Tipo',
    key: 'default',
    textAlign: 'center',
    width: 2,
    sortKey: 'default_id',
  },
  {
    content: 'Representatividade',
    key: 'store_percentage',
    textAlign: 'center',
    width: 2,
    sortKey: 'store_percentage',
  },
  {
    content: 'PDVs Associados',
    key: 'store_count',
    textAlign: 'center',
    width: 2,
    sortKey: 'store_count',
  },
]

export default header
