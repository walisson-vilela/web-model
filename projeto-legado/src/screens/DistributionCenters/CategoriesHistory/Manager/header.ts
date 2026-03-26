import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'Mês',
    key: 'reference_txt',
    textAlign: 'left',
    width: 4,
    sortKey: 'reference',
  },
  {
    content: 'Forma de Rateio',
    key: 'apportionment_jsx',
    textAlign: 'left',
    width: 4,
    sortKey: 'apportionment',
  },
  {
    content: 'PDVs Associados',
    key: 'store_count_jsx',
    textAlign: 'center',
    width: 4,
    sortKey: 'store_count',
  },
  {
    content: 'Particularidades',
    key: 'particularities_jsx',
    textAlign: 'center',
    width: 4,
    sortKey: 'category_count',
  },
]

export default header
