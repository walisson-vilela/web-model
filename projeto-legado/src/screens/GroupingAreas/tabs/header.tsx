import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'Status',
    key: 'status_jsx',
    textAlign: 'left',
    width: 2,
    sortKey: 'active',
  },
  {
    content: 'Agrupamento',
    key: 'name',
    textAlign: 'left',
    width: 4,
    sortKey: 'name',
  },
  {
    content: 'País',
    key: 'country',
    textAlign: 'left',
    width: 2,
    sortKey: 'country_label',
  },
  {
    content: 'Área de Atuação',
    key: 'area_count',
    textAlign: 'center',
    width: 2,
    sortKey: 'area_count',
  },
  {
    content: 'Roteiro',
    key: 'route_count',
    textAlign: 'center',
    width: 2,
    sortKey: 'route_count',
  },
  {
    content: 'PDV',
    key: 'store_count',
    textAlign: 'center',
    width: 2,
    sortKey: 'store_count',
  },
  {
    content: 'Usuário',
    key: 'user_count',
    textAlign: 'center',
    width: 2,
    sortKey: 'user_count',
  },
]

export default header
