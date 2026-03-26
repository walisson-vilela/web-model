import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'Canal',
    key: 'name',
    textAlign: 'left',
    width: 4,
    sortKey: 'name',
  },
  {
    content: 'Tipo de Ação',
    key: 'region_rule_label',
    textAlign: 'left',
    width: 12,
    sortKey: 'region_rule_label',
  },
]

export default header
