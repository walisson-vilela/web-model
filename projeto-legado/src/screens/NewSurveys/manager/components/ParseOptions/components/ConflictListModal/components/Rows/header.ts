import { ColumnInterface } from '@mw-kit/mw-manager'

const pdvHeader: ColumnInterface[] = [
  {
    content: 'Código',
    key: 'code',
    width: 4,
    sortKey: 'Stores.id',
  },
  {
    content: 'PDV',
    key: 'pdv',
    width: 4,
    sortKey: 'Stores.name',
  },
  {
    content: 'Canal',
    key: 'channel',
    width: 4,
    sortKey: 'Segments.name',
  },
  {
    content: 'Bandeira',
    key: 'flag',
    width: 4,
    sortKey: 'Markets.name',
  },
]

const productsHeader: ColumnInterface[] = [
  {
    content: 'Código',
    key: 'code',
    width: 4,
    sortKey: 'Products.id',
  },
  {
    content: 'Produto',
    key: 'products',
    width: 4,
    sortKey: 'Products.name',
  },
  {
    content: 'Categoria',
    key: 'category',
    width: 4,
    sortKey: 'Categories.name',
  },
  {
    content: 'Linha de Produto',
    key: 'product_line',
    width: 4,
    sortKey: 'ProductLines.name',
  },
]

const userHeader: ColumnInterface[] = [
  {
    content: 'Matrícula',
    key: 'code',
    width: 5,
    sortKey: 'Peoples.id',
  },
  {
    content: 'Usuário',
    key: 'user',
    width: 5,
    sortKey: 'Peoples.name',
  },
  {
    content: 'Superior Direto',
    key: 'supervisor',
    width: 6,
    sortKey: 'Supervisor.name',
  },
]
export { pdvHeader, productsHeader, userHeader }
