import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'PDV',
    key: 'name',
    textAlign: 'left',
    width: 4,
    // sortKey: 'Stores.name',
  },
  {
    content: 'Endereço',
    key: 'formatted_address',
    textAlign: 'left',
    width: 6,
    // sortKey: 'Stores.formatted_address',
  },
  {
    content: 'Canal',
    key: 'segment_name',
    textAlign: 'left',
    width: 3,
    // sortKey: 'Segments.name',
  },
  {
    content: 'Tipologia',
    key: 'typology_name',
    textAlign: 'left',
    width: 3,
    // sortKey: 'Typologies.name',
  },
]

export default header
