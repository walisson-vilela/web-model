import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'Status',
    key: 'punctuality_status_jsx',
    textAlign: 'left',
    width: 2,
    sortKey: 'punctuality_status',
  },
  {
    content: 'Ponto de Atendimento',
    key: 'store_name',
    textAlign: 'left',
    width: 2,
    sortKey: 'store_name',
  },
  {
    content: 'Canal',
    key: 'store_name',
    textAlign: 'left',
    width: 2,
    sortKey: 'store_name',
  },
  {
    content: 'Roteiro',
    key: 'route_name',
    textAlign: 'left',
    width: 2,
    sortKey: 'route_name',
  },
  {
    content: 'Executor',
    key: 'people_name',
    textAlign: 'left',
    width: 2,
    sortKey: 'people_name',
  },
  {
    content: 'Supervisor',
    key: 'supervisor_name',
    textAlign: 'left',
    width: 2,
    sortKey: 'supervisor_name',
  },
  {
    content: 'Janela Prevista',
    key: 'planned_time',
    textAlign: 'center',
    width: 2,
    sortKey: 'check_in_planned',
  },
  {
    content: 'Janela Realizada',
    key: 'realized_time',
    textAlign: 'center',
    width: 2,
    sortKey: 'check_in',
  },
]

export default header
