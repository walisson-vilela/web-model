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
    content: 'Rede',
    key: 'name',
    textAlign: 'left',
    width: 6,
    sortKey: 'name',
  },
  {
    content: 'Grupo',
    key: 'group_name',
    textAlign: 'left',
    width: 4,
    sortKey: 'GroupNetwork.name',
  },
  {
    content: 'Qtd. Bandeira',
    key: 'flag_count',
    textAlign: 'center',
    width: 2,
    sortKey: 'first_child_count',
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
