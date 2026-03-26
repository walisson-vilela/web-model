import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
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
    textAlign: 'left',
    width: 4,
    sortKey: 'name',
  },
  {
    content: 'Categoria',
    key: 'category_name',
    textAlign: 'left',
    width: 2,
    sortKey: 'Categories.name',
  },
  {
    content: 'Subcategoria',
    key: 'subcategory_name',
    textAlign: 'center',
    verticalAlign: 'center',
    width: 2,
    sortKey: 'Subategories.name',
  },
  {
    content: 'Linha Produto',
    key: 'product_line_name',
    textAlign: 'center',
    verticalAlign: 'center',
    width: 2,
    sortKey: 'ProductLines.name',
  },
  {
    content: 'Tipo',
    key: 'type_label',
    textAlign: 'center',
    verticalAlign: 'center',
    width: 2,
    sortKey: 'type',
  },
  {
    content: 'Marca',
    key: 'brand_name',
    textAlign: 'center',
    verticalAlign: 'center',
    width: 2,
    sortKey: 'Brands.name',
  },
]

export default header
