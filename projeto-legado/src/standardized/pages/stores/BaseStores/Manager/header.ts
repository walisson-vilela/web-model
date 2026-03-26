import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'ID',
    key: 'id',
    textAlign: 'left',
    width: 2,
    sortKey: 'id',
  },
  {
    content: 'PDV',
    key: 'nickname_jsx',
    textAlign: 'left',
    width: 3,
    sortKey: 'nickname',
  },
  {
    content: 'Endereço',
    key: 'address_formatted_jsx',
    textAlign: 'left',
    width: 3,
    sortKey: 'formatted',
  },
  {
    content: 'Bandeira',
    key: 'market_flag_name_jsx',
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
  {
    content: 'Conta',
    key: 'contractor_count_jsx',
    textAlign: 'center',
    width: 3,
    sortKey: 'contractor_count',
  },
]

export default header
