import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'Status',
    key: 'status_jsx',
    textAlign: 'left',
    width: 1,
    sortKey: 'status',
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
    key: 'supervisor',
    textAlign: 'left',
    width: 2,
    sortKey: 'supervisor_name',
  },
  {
    content: 'Roteiro',
    key: 'route_name',
    textAlign: 'left',
    width: 2,
    sortKey: 'route_name',
  },
  {
    content: 'Atend. Previstos',
    key: 'attendances_count',
    textAlign: 'center',
    width: 2,
    sortKey: 'attendances_count',
  },
  {
    content: 'Atend. Adicionados',
    key: 'added',
    textAlign: 'center',
    width: 2,
    sortKey: 'added',
  },

  {
    content: 'Atend. Realizados (∑)',
    key: 'realized',
    textAlign: 'center',
    width: 2,
    sortKey: 'realized',
  },
  {
    content: 'Distância Prevista',
    key: 'distance_travel_planned_jsx',
    textAlign: 'center',
    width: 2,
    sortKey: 'distance_travel_planned',
  },
  {
    content: 'Distância Realizada',
    key: 'distance_travel_jsx',
    textAlign: 'center',
    width: 2,
    sortKey: 'distance_travel',
  },
]

export default header
