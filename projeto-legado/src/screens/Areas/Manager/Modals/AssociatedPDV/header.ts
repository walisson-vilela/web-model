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
    content: 'Canal',
    key: 'segment_name',
    textAlign: 'left',
    width: 2,
    sortKey: 'Segments.name',
  },
  {
    content: 'Tipologia',
    key: 'typology_name',
    textAlign: 'left',
    width: 2,
    sortKey: 'Typologies.name',
  },
  {
    content: 'Coberto',
    key: 'covered_label',
    textAlign: 'center',
    width: 2,
    sortKey: 'covered',
  },
]

export default header
