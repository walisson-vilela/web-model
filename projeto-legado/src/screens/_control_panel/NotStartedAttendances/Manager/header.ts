import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'Nome',
    key: 'people_name',
    textAlign: 'left',
    width: 2,
    sortKey: 'people_name',
  },
  {
    content: 'Função',
    key: 'role_name',
    textAlign: 'center',
    width: 2,
    sortKey: 'role_name',
  },
  {
    content: 'Status',
    key: 'active_jsx',
    textAlign: 'left',
    width: 2,
    sortKey: 'active_status',
  },
  {
    content: 'Superior',
    key: 'supervisor_name',
    textAlign: 'left',
    width: 2,
    sortKey: 'supervisor_name',
  },
  {
    content: 'Hierarquia',
    key: 'supervisor_hierarchy',
    textAlign: 'left',
    width: 2,
    sortKey: 'supervisor_hierarchy',
  },

  {
    content: 'Nome do Roteiro',
    key: 'route_name',
    textAlign: 'center',
    width: 2,
    sortKey: 'route_name',
  },
  {
    content: 'Carteira',
    key: 'has_customer_list',
    textAlign: 'center',
    width: 2,
    sortKey: 'has_customer_list',
  },
  {
    content: 'Rota Planejada',
    key: 'has_planned',
    textAlign: 'center',
    width: 2,
    sortKey: 'has_planned',
  },
]

export default header
