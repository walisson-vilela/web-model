import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: "EPI's",
    key: 'epi',
    textAlign: 'left',
    width: 2,
    sortKey: 'epi',
  },
  {
    content: 'Descrição/Aplicação',
    key: 'obs',
    textAlign: 'center',
    width: 6,
    sortKey: 'obs',
  },
  {
    content: 'Código CA',
    key: 'ca_code',
    textAlign: 'left',
    width: 2,
    sortKey: 'ca_code',
  },
  {
    content: 'Nota Fiscal',
    key: 'number',
    textAlign: 'center',
    width: 2,
    sortKey: 'number',
  },
  {
    content: 'Data da compra',
    key: 'date_formatted',
    textAlign: 'left',
    width: 2,
    sortKey: 'date_formatted',
  },
  {
    content: 'Quantidade',
    key: 'epi_count',
    textAlign: 'center',
    width: 2,
    sortKey: 'epi_count',
  },
]

export default header
