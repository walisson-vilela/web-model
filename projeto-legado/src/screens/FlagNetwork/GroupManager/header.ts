import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'Status',
    key: 'active_jsx',
    textAlign: 'left',
    width: 2,
    sortKey: 'active',
  },
  {
    content: 'Grupo',
    key: 'name',
    textAlign: 'left',
    width: 8,
    sortKey: 'name',
  },
  {
    content: 'Qtd. Rede',
    key: 'network_count',
    textAlign: 'center',
    width: 2,
    sortKey: 'first_child_count',
  },
  {
    content: 'Qtd. Bandeira',
    key: 'flag_count',
    textAlign: 'center',
    width: 2,
    sortKey: 'next_child_count',
  },
  {
    content: 'PDVs Associados',
    key: 'store_count',
    textAlign: 'center',
    width: 2,
    sortKey: 'store_count',
  },
]

export default header
