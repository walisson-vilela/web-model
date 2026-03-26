import { ColumnInterface } from '@mw-kit/mw-manager'

const width = screen.width
const header: ColumnInterface[] = [
  {
    content: 'Status',
    key: 'status',
    textAlign: 'left',
    width: 2,
    sortKey: 'status',
  },
  {
    content: 'Área',
    key: 'name',
    textAlign: 'left',
    width: 2,
    sortKey: 'name',
  },

  {
    content: 'País',
    key: 'country_name',
    textAlign: 'left',
    width: 2,
    sortKey: 'country_name',
  },
  {
    content: 'Estado',
    key: 'state_count',
    textAlign: 'center',
    width: 2,
    sortKey: 'state_count',
  },
  {
    content: 'Cidade',
    key: 'city_count',
    textAlign: 'center',
    width: 2,
    sortKey: 'city_count',
  },
  {
    content: 'Bairro',
    key: 'sublocality_count',
    textAlign: 'center',
    width: 2,
    sortKey: 'sublocality_count',
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
    content: 'Usuários',
    key: 'user_count',
    textAlign: 'center',
    width: 2,
    sortKey: 'user_count',
  },
  {
    content: 'Particularidade',
    key: 'particularities_label',
    textAlign: 'center',
    width: 3,
    sortKey: 'has_particularities',
  },
]

export default header
