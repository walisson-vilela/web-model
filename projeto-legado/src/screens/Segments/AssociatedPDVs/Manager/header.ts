import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'PDV',
    key: 'name',
    textAlign: 'left',
    width: 4,
    sortKey: 'nickname',
  },
  {
    content: 'Endereço',
    key: 'formatted_address',
    textAlign: 'left',
    width: 9,
    sortKey: 'formatted',
  },
  {
    content: 'Tipologia',
    key: 'typology_name',
    textAlign: 'left',
    width: 3,
    sortKey: 'Typologies.name',
  },
]

export default header
