import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'PDV',
    key: 'store_name',
    textAlign: 'left',
    width: 5,
    sortKey: 'store_name',
  },

  {
    content: 'Agenda',
    key: 'schedule',
    textAlign: 'left',
    width: 4,
    sortKey: 'schedule',
  },

  {
    content: 'Status',
    key: 'status_jsx',
    textAlign: 'left',
    width: 3,
    sortKey: 'status',
  },

  {
    content: 'Janela Prevista',
    key: 'window_planned',
    textAlign: 'center',
    verticalAlign: 'center',
    width: 2,
    sortKey: 'window_planned',
  },

  {
    content: 'Janela Realizada',
    key: 'window_performed',
    textAlign: 'center',
    verticalAlign: 'center',
    width: 2,
    sortKey: 'window_performed',
  },
]

export default header
