import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'Nome',
    key: 'people_name_jsx',
    textAlign: 'left',
    width: 3,
    sortKey: 'people_name',
  },
  {
    content: 'Roteiro',
    key: 'route_name',
    textAlign: 'left',
    width: 2,
    sortKey: 'route_name',
  },
  {
    content: 'Previsto/Realizado',
    key: 'realized_planned_jsx',
    textAlign: 'center',
    width: 2,
    sortKey: 'realized_planned',
  },
  {
    content: 'Adicionados',
    key: 'added_jsx',
    textAlign: 'center',
    width: 1,
    sortKey: 'added',
  },
  {
    content: 'Justificado',
    key: 'justified_jsx',
    textAlign: 'center',
    width: 1,
    sortKey: 'justified',
  },
  {
    content: '1° Check in',
    key: 'min_check_in',
    textAlign: 'center',
    width: 2,
    sortKey: 'min_check_in',
  },
  {
    content: 'Último Check out',
    key: 'max_check_out',
    textAlign: 'center',
    width: 2,
    sortKey: 'max_check_out',
  },
  {
    content: 'Performance',
    key: 'attendance_performance_jsx',
    textAlign: 'center',
    width: 2,
    sortKey: 'attendance_performance',
    // verticalAlign: 'start',
  },
  {
    content: 'Pontualidade',
    key: 'punctuality_performance_jsx',
    textAlign: 'center',
    width: 2,
    sortKey: 'punctuality_performance',
    // verticalAlign: 'start',
  },
]

export default header
