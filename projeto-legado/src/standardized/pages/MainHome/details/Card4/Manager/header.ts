import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'Status',
    key: 'status',
    textAlign: 'left',
    width: 2,
    sortKey: 'status',
  },
  {
    content: 'Roteiro',
    key: 'route',
    textAlign: 'left',
    width: 2,
    sortKey: 'route',
  },
  {
    content: 'Ponto de Atendimento',
    key: 'attendance_point',
    textAlign: 'left',
    width: 3,
    sortKey: 'attendance_point',
  },
  {
    content: 'Auditoria',
    key: 'audit',
    textAlign: 'left',
    width: 2,
    sortKey: 'audit',
  },
  {
    content: 'Origem',
    key: 'origin',
    textAlign: 'left',
    width: 2,
    sortKey: 'origin',
  },
  {
    content: 'Previsão Atend.',
    key: 'planned',
    textAlign: 'left',
    width: 2,
    sortKey: 'planned',
  },
  {
    content: 'Check in',
    key: 'check_in',
    textAlign: 'left',
    width: 2,
    sortKey: 'check_in',
  },
  {
    content: 'Check out',
    key: 'check_out',
    textAlign: 'left',
    width: 2,
    sortKey: 'check_out',
  },
  {
    content: 'Permanência',
    key: 'permanence',
    textAlign: 'left',
    width: 2,
    sortKey: 'permanence',
  },
  {
    content: 'Executor/Função',
    key: 'executor_role',
    textAlign: 'left',
    width: 3,
    sortKey: 'executor_role',
  },
]

export default header
