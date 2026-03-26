import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'Status',
    key: 'active_jsx',
    textAlign: 'left',
    width: 1,
    sortKey: 'active',
  },
  {
    content: 'Central de Compras',
    key: 'name_jsx',
    textAlign: 'left',
    width: 3,
    sortKey: 'name',
  },
  {
    content: 'Bandeira',
    key: 'flag_name',
    textAlign: 'left',
    width: 3,
    sortKey: 'MarketFlags.name',
  },
  {
    content: 'Cidade',
    key: 'city_name',
    textAlign: 'left',
    width: 2,
    sortKey: 'StoresOne.city',
  },
  {
    content: 'UF',
    key: 'state_name',
    textAlign: 'center',
    width: 1,
    sortKey: 'StoresOne.state',
  },
  {
    content: 'PDVs Associados',
    key: 'store_count_jsx',
    textAlign: 'center',
    width: 2,
    sortKey: 'store_count',
  },
  {
    content: 'Forma Rateio',
    key: 'apportionment_name',
    textAlign: 'center',
    width: 2,
    sortKey: 'apportionment',
  },
  {
    content: 'Particularidades',
    key: 'particularities_jsx',
    textAlign: 'center',
    width: 2,
    sortKey: 'category_count',
  },
]

export default header
