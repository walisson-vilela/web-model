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
    content: 'Bandeira',
    key: 'name',
    textAlign: 'left',
    width: 4,
    sortKey: 'name',
  },
  {
    content: 'Rede',
    key: 'network_name',
    textAlign: 'left',
    width: 4,
    sortKey: 'NetworkFlag.name',
  },
  {
    content: 'Grupo',
    key: 'group_name',
    textAlign: 'left',
    width: 4,
    sortKey: 'GroupNetwork.name',
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
