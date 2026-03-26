import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'Nome',
    key: 'name',
    textAlign: 'left',
    width: 3,
    sortKey: 'name',
  },
  {
    content: 'Função',
    key: 'role',
    textAlign: 'left',
    width: 2,
    sortKey: 'role',
  },
  {
    content: 'Status',
    key: 'status_label',
    textAlign: 'left',
    width: 2,
    sortKey: 'status',
  },
  {
    content: 'Motivo Inativação',
    key: 'inactivation_reason',
    textAlign: 'left',
    width: 3,
    sortKey: 'inactivation_reason',
  },
  {
    content: 'Supervisor',
    key: 'supervisor',
    textAlign: 'left',
    width: 3,
    sortKey: 'supervisor',
  },
  {
    content: 'Nome do roteiro',
    key: 'route_name',
    textAlign: 'left',
    width: 3,
    sortKey: 'route_name',
  },
  {
    content: 'Área de atuação',
    key: 'operation_area',
    textAlign: 'left',
    width: 3,
    sortKey: 'operation_area',
  },
  {
    content: 'Carteira',
    key: 'wallet',
    textAlign: 'center',
    width: 2,
    sortKey: 'wallet',
  },
  {
    content: 'Rota planejada',
    key: 'planned_route',
    textAlign: 'center',
    width: 2,
    sortKey: 'planned_route',
  },
]

export default header
