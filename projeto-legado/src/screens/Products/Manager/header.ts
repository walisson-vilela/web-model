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
    content: 'Produto',
    key: 'name',
    width: 4,
    textAlign: 'left',
    sortKey: 'name',
  },
  {
    content: 'Marca',
    key: 'brand_name',
    width: 2,
    textAlign: 'left',
    sortKey: 'Brands.name',
  },
  {
    content: 'Tipo Produto',
    key: 'type_label',
    width: 2,
    textAlign: 'center',
    sortKey: 'type',
  },
  {
    content: 'Categoria',
    key: 'category_name',
    width: 2,
    textAlign: 'center',
    sortKey: 'Categories.name',
  },

  {
    content: 'Subníveis',
    key: 'product_line_path_label',
    width: 2,
    textAlign: 'left',
    sortKey: 'ProductLines.path_label',
  },
]

export default header
