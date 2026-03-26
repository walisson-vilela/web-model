import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'ID',
    key: 'id',
    textAlign: 'left',
    width: 3,
    sortKey: 'id',
  },
  {
    content: 'PDV',
    key: 'nickname_jsx',
    textAlign: 'left',
    width: 5,
    sortKey: 'nickname',
  },
  {
    content: 'Endereço',
    key: 'address_formatted_jsx',
    textAlign: 'left',
    width: 5,
    sortKey: 'formatted',
  },
  {
    content: 'Conta',
    key: 'contractor_count_jsx',
    textAlign: 'center',
    width: 3,
    sortKey: 'contractor_count',
  },
]

export default header
