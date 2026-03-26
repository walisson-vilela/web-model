import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'PDV',
    key: 'pdv',
    textAlign: 'left',
    width: 6,
    sortKey: 'nickname',
  },
  {
    content: 'Endereço',
    key: 'address',
    textAlign: 'left',
    width: 6,
    sortKey: 'formatted',
  },
  {
    content: 'Canal',
    key: 'segment',
    textAlign: 'left',
    width: 4,
    sortKey: 'Segments.name',
  },
]

export default header
