import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'Status',
    key: 'active_jsx',
    textAlign: 'left',
    width: 1,
    sortKey: 'status',
  },
  {
    content: 'ID da Conta',
    key: 'account_id',
    textAlign: 'center',
    width: 2,
    sortKey: 'account_id',
  },
  {
    content: 'Conta',
    key: 'casual_name',
    textAlign: 'left',
    width: 7,
    sortKey: 'nickname',
  },
  {
    content: 'Compartilhada',
    key: 'can_group',
    textAlign: 'center',
    width: 2,
    sortKey: 'shared',
  },
  {
    content: 'Tipo da Conta',
    key: 'account_type',
    textAlign: 'center',
    width: 2,
    sortKey: 'type',
  },
  {
    content: 'Responsáveis',
    key: 'contractor_peoples_count',
    textAlign: 'center',
    width: 2,
    sortKey: 'contractor_people_count',
  },
]

export default header
