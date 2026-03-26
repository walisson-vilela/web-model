import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'Ponto de Atendimento',
    key: 'store_name',
    textAlign: 'left',
    width: 3,
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
    key: 'supervisor',
    textAlign: 'left',
    width: 2,
    sortKey: 'supervisor',
  },
  {
    content: 'Dia da Visita',
    key: 'week_day_jsx',
    textAlign: 'left',
    width: 2,
    sortKey: 'week_day',
  },
  {
    content: 'Os Motivos de Justificativas',
    key: 'justify_name',
    textAlign: 'center',
    width: 3,
    sortKey: 'justify_name',
  },
]

export default header
