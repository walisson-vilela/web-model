import type { ColumnInterface } from '@mw-kit/mw-manager'

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
    textAlign: 'center',
    width: 2,
    sortKey: 'role',
  },
  {
    content: 'Supervisor',
    key: 'supervisor',
    textAlign: 'center',
    width: 2,
    sortKey: 'supervisor',
  },
  {
    content: 'Nome do roteiro',
    key: 'route_name',
    textAlign: 'center',
    width: 2,
    sortKey: 'route_name',
  },
  {
    content: 'Área de atuação',
    key: 'area',
    textAlign: 'center',
    width: 2,
    sortKey: 'area',
  },
  {
    content: 'Motivo',
    key: 'reason',
    textAlign: 'center',
    width: 2,
    sortKey: 'reason',
  },
  {
    content: 'Data',
    key: 'date',
    textAlign: 'center',
    width: 2,
    sortKey: 'date',
  },
  {
    content: 'Qtde. de Dias',
    key: 'total_days',
    textAlign: 'center',
    width: 2,
    sortKey: 'total_days',
  },
]

export default header
