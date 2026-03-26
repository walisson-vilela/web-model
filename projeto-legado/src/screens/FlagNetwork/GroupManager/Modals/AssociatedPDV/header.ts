import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'PDV',
    key: 'pdv',
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
    content: 'Canal',
    key: 'segment',
    textAlign: 'left',
    width: 3,
    sortKey: 'Segments.name',
  },
  {
    content: 'Tipologia',
    key: 'typology',
    textAlign: 'left',
    width: 3,
    sortKey: 'Typologies.name',
  },
]

export default header
