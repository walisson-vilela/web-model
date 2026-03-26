import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'Status',
    key: 'attendances_status_jsx',
    textAlign: 'left',
    width: 1,
    sortKey: 'attendance_status',
  },
  {
    content: 'Roteiro',
    key: 'route_name',
    textAlign: 'left',
    width: 2,
    sortKey: 'route_name',
  },
  {
    content: 'Ponto de Atendimento',
    key: 'store_name_jsx',
    textAlign: 'left',
    width: 2,
    sortKey: 'store_name',
  },
  {
    content: 'Auditoria',
    key: 'store_validated',
    textAlign: 'left',
    width: 2,
    sortKey: 'store_validated',
  },
  {
    content: 'Origem',
    key: 'attendance_origin',
    textAlign: 'left',
    width: 1,
    sortKey: 'attendance_origin',
  },
  {
    content: 'Previsão Atendimento',
    key: 'duration_planned',
    textAlign: 'left',
    width: 2,
    sortKey: 'duration_planned',
  },
  {
    content: 'Check in',
    key: 'check_in_jsx',
    textAlign: 'center',
    width: 2,
    sortKey: 'check_in',
  },
  {
    content: 'Check out',
    key: 'check_out_jsx',
    textAlign: 'center',
    width: 2,
    sortKey: 'check_out',
  },
  {
    content: 'Permanencia',
    key: 'duration',
    textAlign: 'center',
    width: 1,
    sortKey: 'duration',
  },
  {
    content: 'Executor/Funcão',
    key: 'people_name_jsx',
    textAlign: 'center',
    width: 2,
    sortKey: 'people_name',
  },
]

export default header
