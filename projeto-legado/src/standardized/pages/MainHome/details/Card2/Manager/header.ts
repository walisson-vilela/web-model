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
    content: 'Status',
    key: 'status_label',
    textAlign: 'left',
    width: 2,
    sortKey: 'status',
  },
  {
    content: 'Supervisor',
    key: 'supervisor',
    textAlign: 'left',
    width: 3,
    sortKey: 'supervisor',
  },
  {
    content: 'Hierarquia',
    key: 'hierarchy',
    textAlign: 'left',
    width: 3,
    sortKey: 'hierarchy',
  },
  {
    content: 'Nome do roteiro',
    key: 'route_name',
    textAlign: 'left',
    width: 3,
    sortKey: 'route_name',
  },
  {
    content: "Qtde. PDV's dia",
    key: 'pdvs_day',
    textAlign: 'center',
    width: 2,
    sortKey: 'pdvs_day',
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
