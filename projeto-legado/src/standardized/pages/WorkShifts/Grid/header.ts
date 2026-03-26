import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'ID',
    key: 'id',
    textAlign: 'left',
    width: 1,
    sortKey: 'id',
  },
  {
    content: 'Status',
    key: 'active_jsx',
    textAlign: 'left',
    width: 2,
    sortKey: 'active',
  },

  {
    content: 'Tipo Turno',
    key: 'electronic_point_label',
    textAlign: 'left',
    width: 2,
    sortKey: 'electronic_point',
  },
  {
    content: 'Rotina Semanal',
    key: 'weekdays_jsx',
    textAlign: 'center',
    width: 3,
  },
  {
    content: 'Carga Horária (S)',
    key: 'workload_label',
    textAlign: 'center',
    width: 3,
    sortKey: 'workload',
  },
  {
    content: 'Intervalos (D)',
    key: 'average_interval_label',
    textAlign: 'center',
    width: 3,
    sortKey: 'average_interval',
  },
  {
    content: 'Usuário',
    key: 'user_count_jsx',
    textAlign: 'center',
    width: 3,
    sortKey: 'user_count',
  },
]

export default header
