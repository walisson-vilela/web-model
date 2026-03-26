import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'Status',
    key: 'status_jsx',
    textAlign: 'left',
    width: 2,
    sortKey: 'status',
  },
  {
    content: 'Código',
    key: 'code',
    textAlign: 'left',
    width: 2,
    sortKey: 'code',
  },
  {
    content: 'Marca',
    key: 'name',
    textAlign: 'left',
    width: 4,
    sortKey: 'name',
  },
  {
    content: 'Fabricante',
    key: 'supplier',
    textAlign: 'left',
    width: 4,
    sortKey: 'Suppliers.name',
  },
  {
    content: 'Tipo',
    key: 'type_label',
    textAlign: 'center',
    width: 2,
    sortKey: 'type',
  },
  {
    content: 'País',
    key: 'country_count_jsx',
    textAlign: 'center',
    width: 2,
    sortKey: 'country_count',
  },

  {
    content: 'Produto',
    key: 'products_count_jsx',
    textAlign: 'center',
    width: 2,
    sortKey: 'product_count',
  },
]

export default header
