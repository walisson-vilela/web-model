import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'Status',
    key: 'status',
    textAlign: 'left',
    width: 1,
    sortKey: 'StatisticAttendances.status',
  },
  {
    content: 'Executor',
    key: 'people_name',
    textAlign: 'left',
    width: 2,
    sortKey: 'Peoples.name',
  },
  {
    content: 'Supervisor',
    key: 'supervisor',
    textAlign: 'left',
    width: 2,
    sortKey: 'Supervisors.name',
  },
  {
    content: 'Roteiro',
    key: 'route_name',
    textAlign: 'left',
    width: 2,
    sortKey: 'Routes.name',
  },
  {
    content: 'Qtd. Deslocamento',
    key: 'displacement_count',
    textAlign: 'center',
    width: 2,
    sortKey: 'StatisticAttendances.displacement_count',
  },
  {
    content: 'Distância Total',
    key: 'distance_travel_planned_jsx',
    textAlign: 'center',
    width: 2,
    sortKey: 'StatisticAttendances.distance_travel_planned',
  },

  {
    content: 'Tempo Previsto (∑)',
    key: 'duration_planned_jsx',
    textAlign: 'center',
    width: 2,
    sortKey: 'StatisticAttendances.duration_planned',
  },
  {
    content: 'Veloc. M. Ideal',
    key: 'speed_planned_jsx',
    textAlign: 'center',
    width: 2,
    sortKey: 'speed_planned',
  },
  {
    content: 'Veloc. M. Real',
    key: 'speed_jsx',
    textAlign: 'center',
    width: 2,
    sortKey: 'velocity_real',
  },
]

export default header
