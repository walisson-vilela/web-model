import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'Bandeira',
    key: 'name',
    textAlign: 'left',
    width: 4,
    sortKey: 'name',
  },
  {
    content: 'Tipo de Ação',
    key: 'region_rule_label',
    textAlign: 'left',
    width: 4,
    sortKey: 'region_rule_label',
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
]

export default header
