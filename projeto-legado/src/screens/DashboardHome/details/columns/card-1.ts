import { ColumnInterface } from '@mw-kit/mw-manager'

export const coverageColumns: ColumnInterface[] = [
  { content: 'Executor', key: 'executorCell', sortKey: 'executor', textAlign: 'left', width: 2 },
  {
    content: 'Motivos de Inativação',
    key: 'inactivationReason',
    sortKey: 'inactivationReason',
    textAlign: 'left',
    width: 2,
  },
  { content: 'Função', key: 'roleCell', sortKey: 'role', textAlign: 'left', width: 2 },
  {
    content: 'Supervisor Direto',
    key: 'directSupervisor',
    sortKey: 'directSupervisor',
    textAlign: 'left',
    width: 2,
  },
  { content: 'Roteiro', key: 'routeCell', sortKey: 'routeName', textAlign: 'left', width: 2 },
  { content: 'Tipo', key: 'typeCell', sortKey: 'type', textAlign: 'left', width: 2 },
  { content: 'Área', key: 'area', sortKey: 'area', textAlign: 'left', width: 2 },
  {
    content: 'Rota Planejada',
    key: 'plannedRoute',
    sortKey: 'plannedRoute',
    textAlign: 'center',
    width: 2,
  },
  { content: '', key: 'actions', textAlign: 'center', width: 2 },
]
