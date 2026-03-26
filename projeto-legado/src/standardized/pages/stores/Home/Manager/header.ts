import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'Status',
    key: 'status_jsx',
    textAlign: 'left',
    width: 1,
    sortKey: 'status',
  },
  {
    content: 'Auditado',
    key: 'validated_jsx',
    textAlign: 'left',
    width: 1,
    sortKey: 'AddressCoordinates.status',
  },
  {
    content: 'Coberto',
    key: 'covered_jsx',
    textAlign: 'center',
    width: 1,
    sortKey: 'covered',
  },
  {
    content: 'Código',
    key: 'code',
    textAlign: 'left',
    width: 1,
    sortKey: 'code',
  },
  {
    content: 'PDV',
    key: 'name_jsx',
    textAlign: 'left',
    width: 3,
    sortKey: 'nickname',
  },
  {
    content: 'Endereço',
    key: 'formatted_address',
    textAlign: 'left',
    width: 3,
    sortKey: 'formatted',
  },
  {
    content: 'Bandeira',
    key: 'flag_name',
    textAlign: 'center',
    width: 2,
    sortKey: 'MarketFlags.name',
  },
  {
    content: 'Canal',
    key: 'segment_name',
    textAlign: 'center',
    width: 2,
    sortKey: 'Segments.name',
  },
  {
    content: 'Tipologia',
    key: 'typology_name',
    textAlign: 'center',
    width: 2,
    sortKey: 'Typologies.name',
  },
]

export default header
