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
    content: 'Fabricante',
    key: 'name',
    width: 5,
    textAlign: 'left',
    sortKey: 'name',
  },
  {
    content: 'Marca',
    key: 'brands_count_jsx',
    width: 2,
    textAlign: 'center',
    sortKey: 'brand_count',
  },
  {
    content: 'Representatividade',
    key: 'brand_percentage_jsx',
    width: 2,
    textAlign: 'center',
    sortKey: 'brand_percentage',
  },
  {
    content: 'Produto',
    key: 'product_count_jsx',
    width: 3,
    textAlign: 'center',
    sortKey: 'product_count',
  },
]

export default header
