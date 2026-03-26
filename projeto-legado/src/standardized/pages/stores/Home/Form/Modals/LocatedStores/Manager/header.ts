import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'PDV',
    key: 'nickname',
    textAlign: 'left',
    width: 5,
    sortKey: 'nickname',
  },
  {
    content: 'Endereço',
    key: 'address',
    textAlign: 'left',
    width: 5,
    sortKey: 'formatted',
  },
  {
    content: 'CNPJ',
    key: 'document',
    textAlign: 'center',
    width: 5,
    sortKey: 'document',
  },
]

export default header
