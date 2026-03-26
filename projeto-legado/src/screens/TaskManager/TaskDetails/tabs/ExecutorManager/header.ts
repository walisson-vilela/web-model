import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'Executor',
    key: 'name',
    textAlign: 'left',
    width: 2,
    sortKey: 'name',
  },
  {
    content: 'Função',
    key: 'role_name',
    textAlign: 'left',
    width: 2,
    sortKey: 'role',
  },
  {
    content: 'Supervisor',
    key: 'supervisor_name',
    textAlign: 'left',
    width: 2,
    sortKey: 'supervisor',
  },
  {
    content: 'Roteiro',
    key: 'route_name',
    textAlign: 'left',
    width: 2,
    sortKey: 'route',
  },
  {
    content: 'Área de Atuação',
    key: 'region_name',
    textAlign: 'left',
    width: 2,
    sortKey: 'region',
  },
  {
    content: 'Qtd. Visita',
    key: 'visit_count',
    textAlign: 'center',
    width: 2,
    sortKey: 'visit_count',
  },
  {
    content: 'Check Out',
    key: 'check',
    textAlign: 'center',
    width: 2,
    sortKey: 'check',
  },
  {
    content: '% Realizado P0',
    key: 'task_percent',
    textAlign: 'center',
    width: 2,
    sortKey: 'task_percent',
  },
]

export default header
