import { ColumnInterface } from '@mw-kit/mw-manager'

const width = screen.width
const header: ColumnInterface[] = [
  {
    content: 'Status',
    key: 'status_jsx',
    textAlign: 'left',
    width: width > 1360 ? 1 : 2,
    sortKey: 'status',
  },
  {
    content: 'Canal',
    key: 'name',
    textAlign: 'left',
    width: width > 1360 ? 7 : 6,
    sortKey: 'name',
  },
  {
    content: 'Tipo',
    key: 'default_label',
    textAlign: 'center',
    width: 2,
    sortKey: 'default_id',
  },
  {
    content: 'Representatividade',
    key: 'store_percentage_txt',
    textAlign: 'center',
    width: 3,
    sortKey: 'store_percentage',
  },
  {
    content: 'PDV',
    key: 'store_count_jsx',
    textAlign: 'center',
    width: 3,
    sortKey: 'store_count',
  },
]

export default header
