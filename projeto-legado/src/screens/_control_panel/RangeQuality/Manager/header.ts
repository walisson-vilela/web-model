import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'Status',
    key: 'status',
    textAlign: 'left',
    width: 1,
    sortKey: 'status',
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
    key: 'segment_name',
    textAlign: 'left',
    width: 2,
    sortKey: 'segment_name',
  },
  {
    content: 'Tempo Canal',
    key: 'segment_time',
    textAlign: 'left',
    width: 2,
    sortKey: 'segment_time',
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
    content: 'Previsto no Roteiro',
    key: 'window_planned',
    textAlign: 'center',
    width: 2,
    sortKey: 'window_planned',
  },
  {
    content: 'Tempo Realizado',
    key: 'window_performed',
    textAlign: 'center',
    width: 2,
    sortKey: 'window_performed',
  },
]

export default header
