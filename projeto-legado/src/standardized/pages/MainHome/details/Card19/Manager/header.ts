import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'Nome',
    key: 'name',
    textAlign: 'center',
    width: 3,
    sortKey: 'name',
  },
  {
    content: 'Nome do roteiro',
    key: 'route',
    textAlign: 'center',
    width: 2,
    sortKey: 'route',
  },
  {
    content: 'Nome do PDV',
    key: 'pdv',
    textAlign: 'center',
    width: 3,
    sortKey: 'pdv',
  },
  {
    content: 'Auditoria',
    key: 'audit',
    textAlign: 'center',
    width: 2,
    sortKey: 'audit',
  },
  {
    content: 'Check-in',
    key: 'check_in',
    textAlign: 'center',
    width: 2,
    sortKey: 'check_in',
  },
  {
    content: 'Tempo de Atendimento',
    key: 'attendance_time',
    textAlign: 'center',
    width: 2,
    sortKey: 'attendance_time',
  },
  {
    content: 'Check-out',
    key: 'check_out',
    textAlign: 'center',
    width: 2,
    sortKey: 'check_out',
  },
  {
    content: 'Qtde. de Ocorrências',
    key: 'occurrences',
    textAlign: 'center',
    width: 2,
    sortKey: 'occurrences',
  },
]

export default header
